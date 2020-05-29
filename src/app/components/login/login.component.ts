import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  loginForm: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    })
  }

  login() {
    if(this.loginForm.invalid) {
      this.snackBar.open("Login inválido!", "OK", {
        duration: 2000
      });
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('ACCESS_TOKEN', res.token);
        localStorage.setItem('usuario', JSON.stringify(res));
        this.router.navigateByUrl('/home');
      },
      err => {
        console.log('err', err);
        alert(err.status);
      }
    );
  }

}
