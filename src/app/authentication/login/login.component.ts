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
  userName: string;
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
      userName: new FormControl('admin'),
      password: new FormControl('admin'),
    });
  }

  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    this.authService.login(this.userName, this.password)
      .subscribe({
        next: () => {
          console.log(data);
          this.toastr.success('You have Successfully Logged in!', 'Success!', {
            timeOut: 8000,
          });

          localStorage.setItem('isUserLoggedIn', 'true');
          this.tokenService.saveToken(data['access']);
          this.tokenService.saveEmail(data['authenticatedUser']['email']);
          this.tokenService.savePermissions(JSON.stringify(data['authenticatedUser']['user_permissions']));

          if (data) { this.router.navigate(['/dashboard']); }
        },
        error: error => {
          console.log('Subscription Error Occured during Login ');
          console.log(error);

        }
      });

  }

}
