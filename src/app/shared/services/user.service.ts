import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,
    private authServic:AuthService
  ) { }

  getUserProfile(){
    return this.http.get(environment.ApiUrl+'accounts/UserProfile');
  }
  
}
