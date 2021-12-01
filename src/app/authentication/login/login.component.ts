import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {TokenService} from '../../services/token.service';

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

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) { }

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
      .subscribe( data => {
        console.log(data);

        localStorage.setItem('isUserLoggedIn', 'true');
        this.tokenService.saveToken(data['access']);
        this.tokenService.saveEmail(data['authenticatedUser']['email']);
        this.tokenService.savePermissions(JSON.stringify(data['authenticatedUser']['user_permissions']));

        if (data) { this.router.navigate(['/dashboard']); }
      });
  }

}
