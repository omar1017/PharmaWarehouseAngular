import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection!: signalR.HubConnection;

  constructor(private authService: AuthService) { }

  public startConnection = () => {
    if(this.authService.isAdmin()){
      this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.ApiUrl+'notificationHub',{
        accessTokenFactory: () => {
          const token = localStorage.getItem('token');
          return token ? `${token}` : '';  // تأكد من إضافة Bearer
        }
      })
      .build();

      this.hubConnection
          .start()
          .then(()=> console.log('Connection started'))
          .catch((err)=> console.log('Error while starting connection: '+err));
    }

  }

  public addProductAddedListener = (callback: (product:any) => void) => {
    if(this.authService.isAdmin()){
      this.hubConnection.on('ProductAdded', callback);
    }
  }

}
