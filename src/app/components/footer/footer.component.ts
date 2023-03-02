import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public totalItems :any
  isLoggedIn = false
  username = ""
  constructor(private cartService: CartService, private tokenStorage: TokenService) { }

  ngOnInit(): void {
    this.totalItems = this.cartService.getItems()
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.username = user.username
    }
  }
 
  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }
}