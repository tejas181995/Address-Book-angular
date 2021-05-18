import { Inject } from '@angular/core';
import { BigJson } from "../../../assets/big.json"

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddressbookServiceService } from 'src/app/service/addressbook-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form : FormGroup;
  firstName: String;
  lastName: String;
  phone: String;
  email: String;
  address: String;
  city: String;
  state: any;
  zipCode: String;
  cities: any=[]
  stateCity: any = BigJson.stateCity;
  states = Object.keys(this.stateCity); 

  constructor(public dialogref : MatDialogRef<UpdateComponent>, @Inject(MAT_DIALOG_DATA) public data : any,
  private addressbookservice : AddressbookServiceService, private formBuilder : FormBuilder,
  private router : Router ) {
    this.form = formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    });
    console.log(data);
    this.firstName = data.contact.firstName;
    this.lastName = data.contact.lastName;
    this.phone = data.contact.phone;
    this.email = data.contact.email;
    this.address = data.contact.address;
    this.city = data.contact.city;
    this.state = data.contact.state;
    this.zipCode = data.contact.zipCode;
  }

  ngOnInit(): void {
    console.log(this.city)
    this.cities = this.stateCity[this.state]
  }
  show(){
    this.cities = this.stateCity[this.form.value.state]
  }
  onSubmit(){
    if(this.form.valid){
      let obj = {
        firstname: this.form.value.firstname,
        lastName: this.form.value.lastName,
        phone: this.form.value.phone,
        email: this.form.value.email,
        address: this.form.value.address,
        city: this.form.value.city,
        state: this.form.value.state,
        zipCode: this.form.value.zipCode
      }
      console.log(obj);
      this.addressbookservice.updateContact(this.data.contact.id, obj).subscribe((response: any )=> {
        console.log("Response : ", response);
        this.dialogref.close();
      })
    }
  }
  onClose(){
    this.dialogref.close();
  }

}

