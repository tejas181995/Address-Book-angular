import { Injectable } from '@angular/core';
import { HttpServiceService } from './http-service.service';

@Injectable({
  providedIn: 'root'
})
export class AddressbookServiceService {

  constructor(private httpservice : HttpServiceService) { }

  addContact(data: any){
    return this.httpservice.Post('',data);
  }
  getContacts(){
    return this.httpservice.Get();
  }
}
