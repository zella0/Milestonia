import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loaded : boolean = false;
  submitted : boolean = false;
  loading : boolean = false;
  loginFormGroup : FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    this.loginFormGroup = this.formBuilder.group({
      email: '',
      password: ''
    })
  }

  ngOnInit() {
    if (this.authService.verifyToken()) {
      this.router.navigate(['']);
      setTimeout(()=>{
        this.loaded = true;
      }, 150)
    }else{
      this.loaded = true;
    }
  }

  onLogin(){
    this.loading = true;
    this.authService.userLogin(this.loginFormGroup.value).add(()=>{
      this.loading = false;
      this.submitted = true;
    })
  }
}
