import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  options = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
    })
  };
  baseUrl = environment.BaseUrl;
  constructor(private httpservice : HttpClient) { }

  Post(url: string, data: any){
    console.log(this.baseUrl + url);
    return this.httpservice.post(this.baseUrl + url, data, this.options);
  }
  Get():Observable<any>{
    return this.httpservice.get<any>(this.baseUrl+"/all", this.options);
  }
  Delete(id: any){
    return this.httpservice.delete(this.baseUrl+"/delete/"+id);
  }
}
