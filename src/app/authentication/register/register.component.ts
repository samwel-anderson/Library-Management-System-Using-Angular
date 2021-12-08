import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService
  ) { }

  registerForm = new FormGroup({
    name: new FormControl('',  [Validators.required, Validators.maxLength(15)] ),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(15)])

  });


  ngOnInit(): void {


  }

  onFormSubmit(): void {
    const formName = this.registerForm.get('name').value;
    const formEmail = this.registerForm.get('email').value;
    const formPassword = this.registerForm.get('password').value;


    function displayErrorMessage(message: string): void {
      this.toastr.error(`${message}`, 'Error!', {
        timeOut: 8000,
      });
    }

    this.authService.register(formName, formEmail, formPassword)
      .subscribe(
        res => {
          this.toastr.success(`${res['message']}, Please Login To Continue`, 'Success!', {
            timeOut: 8000,
          });
          if (res) { this.router.navigate(['/auth/login']); }
        },
        err => {

          console.log('HTTP Error', err);
          console.log('Register Componet Error');
          console.log(err);

          this.toastr.error(`${err.error['email']}`, 'Error!', {
            timeOut: 8000,
          });

          // if (err.error['email'] != null) {
          //   err.error['email'].forEach(function (value) {
          //     console.log(value);
          //     displayErrorMessage(value);
          //   });
          // }
        },
        () => console.log('HTTP request completed.')
      );

  }


}
