import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
