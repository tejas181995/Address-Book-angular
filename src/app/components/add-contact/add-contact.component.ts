import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressbookServiceService } from 'src/app/service/addressbook-service.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private addressbookService : AddressbookServiceService, 
    private router : Router ){
    this.form = this.formBuilder.group({
      firstName : ['', [Validators.required]],
      lastName : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
  }
  onSubmit(){
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
