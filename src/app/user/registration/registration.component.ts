import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;
  isSubmitted : boolean = false;
  constructor(public formBuilder: FormBuilder, private service:AuthService, private router:Router ,
    private toastr:ToastrService
  ){
    this.form = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['',[Validators.required, Validators.email]],
      pharmaName: ['',Validators.required],
      address: ['',Validators.required],
      password: ['', Validators.required],
      confirmPassword :['', Validators.required]
    }, {validators:this.passwordMatchValidator});
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) : null =>{

    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if(password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({passwordMismatch:true});
    else
      confirmPassword?.setErrors(null)

    return null;
  }
  ngOnInit(): void {
    if(this.service.isLoggedIn())
      this.router.navigateByUrl('/dashboard');
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value)
        .subscribe({
          next: (res: any) => {
            if (res != null) {
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user created!', 'Registration Successful')
            }
          },
          error: err=> {
            this.toastr.error('error');
          }
           

        });
    }
  }

  hasDisplayableError(controlName: string): Boolean{
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }
 
}
