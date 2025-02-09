import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { claimReq } from '../shared/utils/claimReq-utils';
import { HideIfClaimsNotMetDirective } from '../shared/directives/hide-if-claims-not-met.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HideIfClaimsNotMetDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private router:Router, 
    private userService:UserService){}
  firstName : string ='';
  claimReq = claimReq;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (res:any) => this.firstName = res.firstName,
      error: (err:any) => console.log('error while retrieving user profile:\n',err)
    })
  }
}