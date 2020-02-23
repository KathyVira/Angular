import { Component, OnInit } from "@angular/core";
import { Contact } from "../../models/contact";
import { ContactsService } from "../../services/contacts.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { FirebaseService } from "../../services/firebase.service";
// import { UpdateCustomerComponent } from "../update-customer/update-customer.component";

@Component({
  selector: "app-customers",
  templateUrl: "./customers.component.html",
  styleUrls: ["./customers.component.css"]
})
export class CustomersComponent implements OnInit {
  pageHeader: string;
  pageDescription: string;
  pageIcon: string;
  avatar: string;
  contacts: Array<Contact>;
  customers: Array<any> = [];

  id: string;
  name: string;
  email: string;
  address: string;

  constructor(
    // private contactService: ContactsService,
    private firestore: AngularFirestore,
    public firebaseService: FirebaseService,
    public router: Router // public updateCustomerComponent: UpdateCustomerComponent
  ) {}

  ngOnInit() {
    this.pageHeader = "Customers Page";
    this.pageDescription = "This is all of your registers customers";
    this.pageIcon = "fas fa-user";

    // this.contactService.getContacts().subscribe((contact: Array<Contact>) => {
    //   // console.log(contact);
    //   this.contacts = contact;
    // });

    // this.firebaseService.getUsers();

    this.firestore
      .collection("customers")
      .get()
      .pipe(
        map(a => {
          a.forEach(customer => {
            this.customers.push({
              id: customer.id,
              name: customer.data().name,
              email: customer.data().email,
              address: customer.data().address
            });
          });
        })
      )
      .subscribe(res => {
        // console.log(this.customers);
      });
  }

  deleteCustomer(id) {
    this.firebaseService.deleteUser(id);
    this.router.navigate(["/customers"]);
  }
  updateCustomer(id, customer) {
    this.firebaseService.updateUser(id, customer);
    // console.log(id);
    // this.firestore
    //   .collection("customers")
    //   .doc(id)
    //   .update({ name: "nnnn", email: "nnnn@gmail.com", address: "nnnntlv" });
  }

  confirmDelete(id) {
    // var txt;
    var r = confirm("You are sure you want to delete this customer?");
    if (r == true) {
      this.deleteCustomer(id);
      // txt = "You pressed OK!";
    } else {
      // txt = "You pressed Cancel!";
    }
    // document.getElementById("demo").innerHTML = txt;
  }
  getCustomer(customer) {
    // console.log(customer.id);
    this.firebaseService.getUser(customer);
    // this.router.navigate(["customer/update", customer]);
  }
}

// (click)="getcustomer(customer.id,customer)">  routerLink="/customer/update"
