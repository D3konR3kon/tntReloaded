import { Component, OnInit, Input } from '@angular/core';
import { Shop } from 'src/app/shop';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent {

  @Input() currentShop: Shop={
    name: '',
    email: '',
    img:''
  
  };
  
  message = ""
  imagePreview:any;
  
    shop: Shop = {
      name: '',
      email: '',
      img: ""
    };
    submitted = false;
    constructor(private shopService: ShopService, private router: Router, private route: ActivatedRoute ) { }
  
    ngOnInit(): void {
      this.getProduct(this.route.snapshot.params['id'])
    }
    
    saveShop(): void {
      const data = {
        name: this.shop.name,
        email: this.shop.email,
        img: this.shop.img
      };
  
      this.shopService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
  }
  
       newShop(): void {
       this.submitted = false;
       this.shop = {
        name: '',
        email: '',
        img: ""
    };
  }
  
  getProduct(id: string): void {
    this.shopService.get(id)
      .subscribe({
        next: (data) => {
          this.currentShop = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
  
  updateShop(): void {
    this.message = '';
  
    this.shopService.update(this.currentShop.id, this.currentShop)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This shop was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }
  
  fileSelect(event: any){
    let imgfile = event.target.files[0]
    if (imgfile) {
      var reader = new FileReader();
  
      reader.readAsDataURL(imgfile); // read file as data url
  
      reader.onload = (event:any) => { // called once readAsDataURL is completed
        console.log(event)
        this.imagePreview = event.target.result;
      }
    }
  }


}
