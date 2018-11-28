import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8000';


  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  userLogin(userLoginBody) {
    return this.http.post(`${this.url}/login`, userLoginBody)
      .subscribe((response) => {
        if (!response['message']) {
          localStorage.setItem('token', response['token']);
          this.router.navigate(['']);
        } else {
          this.snackBar.open('Invalid username or password!', '', {
            duration: 1000,
          });
        }
      })
  }

  userRegister(userRegisterBody) {
    return this.http.post(`${this.url}/register`, userRegisterBody)
      .subscribe((response) => {
        if (response['err']) {
          this.snackBar.open(`${response['err']}`, 'Close');
        } else {
          this.snackBar.open(`${response['message']}`, 'Close', {
            duration: 5000,
          });
        }
      })
  }

  verifyToken() {
    return this.http.get(`${this.url}/verifytoken`, {
      headers: new HttpHeaders().set('token', localStorage.getItem('token') || 'invalid token')
    }).map((response) => {
      if (response['message']) {
        this.router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
    })
  }


  
}
