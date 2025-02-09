import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimReq } from '../../shared/utils/claimReq-utils';
import { SignalRService } from '../../shared/services/signal-r.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HideIfClaimsNotMetDirective],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent implements OnInit {
  constructor(private router: Router,
    private authService:AuthService,
    private signalRService: SignalRService
  ){}
  ngOnInit(): void {
    this.signalRService.startConnection();

    this.signalRService.addProductAddedListener((product)=>{
      console.log('product added: ',product);
    });
  }
  
  claimReq = claimReq;

  onLogout(){
    this.authService.deleteToken();
    this.router.navigateByUrl('/signin');
  }
}
