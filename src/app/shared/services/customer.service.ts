import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getCarts(id:string){
    return this.http.get(environment.ApiUrl+'customers/'+id+'/carts');
  }

  getCustomer(id:string){
    return this.http.get(environment.ApiUrl+'customers/'+id);
  }

  deleteCustomer(id:string){
    return this.http.delete(environment.ApiUrl+'customers/'+id);
  }

  getCustomerByCity(city:string){
    return this.http.get(environment.ApiUrl+'customers/city/'+city);
  }

  getCustomerByName(name:string){
    return this.http.get(environment.ApiUrl+'customers/name/'+name);
  }

  getCustomerByPharma(pharma:string){
    return this.http.get(environment.ApiUrl+'customers/pharma/'+pharma);
  }

  createCustomer(data:any){
    return this.http.post(environment.ApiUrl+'customers',data);
  }

}
