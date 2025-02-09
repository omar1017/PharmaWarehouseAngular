import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { TOKEN_KEY } from '../constants';
import { LoginRequest } from '../../interfaces/login.request';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  createUser(formData:any){
    return this.http.post(environment.ApiUrl+'accounts/register',formData);
  }

  signin(formData:any){
    return this.http.post(environment.ApiUrl+'accounts/login',formData)
  }

  isLoggedIn():boolean{
    return this.getToken() != null ? true :false;
  }

  deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
  }

  getClaims(){
    return JSON.parse(window.atob(this.getToken()!.split('.')[1]));
  }

  getToken(){
    return localStorage.getItem(TOKEN_KEY);
  }

  saveToken(token:string){
    localStorage.setItem(TOKEN_KEY,token);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.role;
    }
    return null;
  }

  isAdmin():boolean{
    const token = this.getToken();
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);

      return decodedToken && decodedToken.role === 'Administrator';
    }
    return false;
  }
}
