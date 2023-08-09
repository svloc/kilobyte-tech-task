import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLoginForm();
  }

  loadLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  loginRequest() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((suc) => {
        if (suc) {
          Swal.fire('Login Success', 'Welcome Back', 'success');
          console.log("res==>",suc.token);
          localStorage.setItem("token",suc.token);
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        } 
      },
        (err) => {
          if (err.status == 401) {
            Swal.fire('Oops', "Invalid Email/Password", 'error');
          } else {
            Swal.fire('Oops', 'Something went wrong', 'error');
          }
        }
      );
    }
  }
}
