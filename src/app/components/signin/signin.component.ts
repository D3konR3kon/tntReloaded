import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  userForm: any = {
    username: null,
    password: null
  }
  isLoggedIn = false
  isLoginFailed = false
  errorMessage = ''
  roles: string[] = []

  constructor( private authService: AuthService, private tokenStorage: TokenService) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true
      this.roles = this.tokenStorage.getUser().roles
    }
  }

  onSubmit(): void {
    const { username, password } = this.userForm
    this.authService.login(username, password)
      .subscribe({
        next: data => {
          this.tokenStorage.saveToken(data.accessToken)
          this.tokenStorage.saveUser(data)
          this.isLoginFailed = false
          this.isLoggedIn = true
          this.roles = this.tokenStorage.getUser().roles
          this.reloadPage()
        },
        error: err => {
          this.errorMessage = err.error.message
          this.isLoginFailed = true
        }
      })
  }

  reloadPage(): void{
    window.location.replace('/home')
  }
}
