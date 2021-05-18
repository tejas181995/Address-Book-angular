import { Component, OnInit } from '@angular/core';
import { BigJson } from "../../../assets/big.json"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotiferService } from 'src/app/notifer.service';
import { AddressbookServiceService } from 'src/app/service/addressbook-service.service';

const FIRSTNAME_REGEX = new RegExp("^[A-Z][a-z]{2,}$")
const LASTNAME_REGEX =new RegExp("^[A-Z][a-z]{2,}$")
const PHONE_REGEX = new RegExp("[0-9]{10}")
const EMAIL_REGEX = new RegExp("^([a-zA-Z0-9+-])+(\\.?[a-zA-Z0-9_+-])*@[a-zA-Z0-9]+[.][a-zA-Z]{2,3}([.]?[a-zA-Z]{2,3})?$")
const ZIP_REGEX = new RegExp("[0-9]{6}")
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  stateCity: any = BigJson.stateCity;
  states = Object.keys(this.stateCity); 
  form: FormGroup;
  cities: any=[]
  constructor(private formBuilder: FormBuilder, private addressbookService : AddressbookServiceService, 
    private router : Router , private notifierService : NotiferService){
    this.form = this.formBuilder.group({
      firstName : ['', [Validators.required, Validators.pattern(FIRSTNAME_REGEX)]],
      lastName : ['', [Validators.required, Validators.pattern(LASTNAME_REGEX)]],
      phone : ['', [Validators.required, Validators.pattern(PHONE_REGEX)]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      address: ['', [Validators.required], ],
      city: ['', [Validators.required],],
      state: ['', [Validators.required,]],
      zipCode: ['', [Validators.required, Validators.pattern(ZIP_REGEX)]]
    });
  }
  ngOnInit(): void {
  }
  show(){
    this.cities = this.stateCity[this.form.value.state]
  }
  onSubmit(){
    console.log(this.form)
    if(this.form.valid){
      console.log(this.form.value);

      let reqContact = {
        firstName : this.form.value.firstName,
        lastName : this.form.value.lastName,
        phone : this.form.value.phone,
        email : this.form.value.email,
        address : this.form.value.address,
        city : this.form.value.city,
        state: this.form.value.state,
        zipCode: this.form.value.zipCode
      }
      console.log(reqContact);
      this.addressbookService.addContact(reqContact).subscribe((response: any) => {
        console.log("Response: ", response);
        this.notifierService.showSuccessfull();
        this.router.navigateByUrl('/dashboard');
       } ,(error)=> {
        console.log(error);
      });
    }
  }
  onReset(){
    location.reload();
  }
  onClose(){
    this.router.navigateByUrl('/dashboard');
  }
}
