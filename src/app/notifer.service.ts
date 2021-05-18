import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotiferService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccessfull(){
    this.snackBar.open('Contact Created Successfully', ' ',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass:'success'
    });
  }
  showDelete(){
    this.snackBar.open('Contact Deleted Successfully',' ',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'delete'
      
    })
  }
  showUpdate(){
    this.snackBar.open('Contact Updated Successfully',' ',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'update'
      
    })
  }
}
