import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressbookServiceService } from 'src/app/service/addressbook-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { NotiferService } from 'src/app/notifer.service';
import { MatTableDataSource } from '@angular/material/table';

export interface contactElement{
  firstName : any
  lastName : any
  phone : any      
  email :any
  address : any
  city : any
  state: any
  zipCode: any
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  contactList: any[]= [];
  ELEMENT_DATA : contactElement[] = this.contactList
  dataSource : any;
  displayedColumns: string[] = ['FirstName', 'LastName', 'PhoneNo', 'E-mail', 'Address', 'City', 'State', 'Zip', 'Action'];
  
  constructor(private addressbookservice : AddressbookServiceService, private router : Router,
    private route : ActivatedRoute, private dialog : MatDialog, private notifierService : NotiferService, ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    console.log(this.dataSource)
    this.getAddressbookData();
  }
  getAddressbookData(){
    this.addressbookservice.getContacts().subscribe((response:any) => {
      this.contactList = response.data;
      this.dataSource = new MatTableDataSource(this.contactList)
      console.log(response);
    })

  }
  deleteContact(id: any){
    this.addressbookservice.deleteContact(id).subscribe((response)=>{
      this.notifierService.showDelete()
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
     this.notifierService.showUpdate()
      console.log('dialog closed');
      this.getAddressbookData();
    });
  } 
  onClick(){
    this.router.navigateByUrl('/addcontact');
  }
  
  applySearch(searchValue: any){
    this.dataSource.filter = (searchValue as HTMLInputElement).value.trim().toLowerCase();
  }

}

