import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  createCart(data:any){
    return this.http.post(environment.ApiUrl+'carts',data);
  }

  getCart(id:string){
    return this.http.get(environment.ApiUrl+'carts/'+id);
  }

  deleteCart(id:string){
    return this.http.delete(environment.ApiUrl+'carts/'+id);
  }
  
}
