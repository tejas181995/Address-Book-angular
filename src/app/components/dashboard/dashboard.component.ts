import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressbookServiceService } from 'src/app/service/addressbook-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNo', 'E-mail', 'Address', 'City', 'State', 'Zip', 'Action'];
  contactList: any[]= [];

  constructor(private addressbookservice : AddressbookServiceService, private router : Router,
    private route : ActivatedRoute, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    this.getAddressbookData();
  }
  getAddressbookData(){
    this.addressbookservice.getContacts().subscribe((response:any) => {
      this.contactList = response.data;
      console.log(response);
    })

  }
  deleteContact(id: any){
    this.addressbookservice.deleteContact(id).subscribe((response)=>{
      console.log(response);
      this.getAddressbookData();
    },(error) => {

    console.log(error);
    })
  }
  updateContact(contact: any){
    const dialogBox = this.dialog.open(UpdateComponent,{
      width: '54%',
      data: {contact}
    })
    dialogBox.afterClosed().subscribe(result => {
      console.log('dialog closed');
      this.getAddressbookData();
    });
  } 
  onClick(){
    this.router.navigateByUrl('/addcontact');
  }


}

