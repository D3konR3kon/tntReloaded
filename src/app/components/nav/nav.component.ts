import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shop';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  private roles: string[] = []
  isLoggedIn = false
  showAdminBoard = false
  showModeratorBoard = false
  username?: string

  shops: Shop[] = [];
  currentShop = {};
  currentIndex = -1;
  name =""

  constructor( private tokenStorage: TokenService, private shopService: ShopService ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken()
    if(this.isLoggedIn){
      const user = this.tokenStorage.getUser()
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN')
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR')
      this.username = user.username
    }
    this.getShops()
  }

  logout(): void{
    this.tokenStorage.signOut()
    window.location.reload()
  }

  searchName(): void {
    this.currentShop = {};
    this.currentIndex = -1;

    this.shopService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.shops = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  getShops(): void {
    this.shopService.getAll().subscribe({
      next: (data) => {
        this.shops = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    })
}
}
