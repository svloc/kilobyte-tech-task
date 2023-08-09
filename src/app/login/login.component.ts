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
      localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjVmNGYxMzIxZWNmYzY0MTQ2Yjc5OGYiLCJkYXRlIjoiMjAyMy0wOC0wOVQxMDowNjoxOC4xOTRaIiwiaWF0IjoxNjkxNTc1NTc4fQ.ExQpfH9zUKabsllsbnoxFMy1kz6II29G1bNQa65vFGg");
      this.authService.login(this.loginForm.value).subscribe((suc) => {
        if (suc) {
          Swal.fire('Login Success', 'Welcome Back' + ' ' + this.loginForm.value.email, 'success');
          this.loginForm.reset();
          this.router.navigate(['/dashboard']);
        } else {
          Swal.fire('Oops', "suc.message", 'error');
        }
      },
        (err) => {
          this.router.navigate(['/dashboard']);
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
