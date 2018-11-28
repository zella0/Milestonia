import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loaded: boolean = false;
  submitted: boolean = false;
  loading: boolean = false;
  registerFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.registerFormGroup = this.formBuilder.group({
      email: '',
      username: '',
      first_name: '',
      last_name: '',
      password: ''
    })
  }

  ngOnInit() {
    // if (this.authService.verifyToken()) {
      // this.router.navigate(['']);
    //   setTimeout(() => {
    //     this.loaded = true;
    //   }, 150)
    // } else {
      this.loaded = true;
    // }
  }

  onRegister(){
    this.loading = true;
    this.authService.userRegister(this.registerFormGroup.value).add(() => {
      this.loading = false;
      this.submitted = true;
    })
  }

}
