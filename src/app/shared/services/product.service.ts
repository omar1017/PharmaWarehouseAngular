import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get(environment.ApiUrl+'products');
  }

  getProduct(id:string){
    return this.http.get(environment.ApiUrl+'products/'+id);
  }

  deleteProducts(id:string){
    return this.http.delete(environment.ApiUrl+'products/'+id);
  }

  
  updateProduct(formData: FormData): Observable<any> {
    return this.http.put(environment.ApiUrl+'products', formData);
  }

  createProduct(data:any){
    return this.http.post(environment.ApiUrl+'products',data);
  }

}
