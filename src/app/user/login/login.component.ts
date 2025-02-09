import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginRequest } from '../../interfaces/login.request';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 
})
export class LoginComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  form!:FormGroup;
  loginRequest!:LoginRequest;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  
    if (this.service.isLoggedIn()){
      const role = this.service.getUserRole();
      this.routeUser(role);
    }
      
  }
  isSubmitted: boolean = false;

 
  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
           (this.isSubmitted || 
           Boolean(control?.touched) || 
           Boolean(control?.dirty))
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.signin(this.form.value).subscribe({
        next: (res: any) => {
          this.service.saveToken(res.token);
  
          // التحقق من دور المستخدم
          const role = this.service.getUserRole();
          this.routeUser(role);
        },
        error: err => {
          if (err.status == 400)
            this.toastr.error('Incorrect email or password.', 'Login failed');
          else
            console.log('error during login:\n', err);
        }
      });
    }
  }

  private routeUser(role:any) : void{
    if (role === 'Administrator') {
      this.router.navigateByUrl('/admin-only');
    } else if (role === 'CustomerAccount') {
      this.router.navigateByUrl('/repo');
    } 
  }

}
