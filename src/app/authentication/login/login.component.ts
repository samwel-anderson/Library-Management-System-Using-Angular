import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  // @ts-ignore
  email: string;
  // @ts-ignore
  password: string;
  // @ts-ignore
  formData: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onClickSubmit(data: any) {
    this.email = data.email;
    this.password = data.password;

    this.authService.login(this.email, this.password)
      .subscribe(
        res => {
          this.toastr.success('You have Successfully Logged in!', 'Success!', {
            timeOut: 8000,
          });

          localStorage.setItem('isUserLoggedIn', 'true');
          this.tokenService.saveToken(res['access']);
          this.tokenService.saveEmail(res['authenticatedUser']['email']);
          this.tokenService.savePermissions(JSON.stringify(res['authenticatedUser']['user_permissions']));

          if (res) { this.router.navigate(['/dashboard']); }
        },
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
      );

  }

}
