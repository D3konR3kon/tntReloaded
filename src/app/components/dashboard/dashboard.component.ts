import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  imagePreview : any;
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';

  prdct?: Product[] 
  product: Product = {
    name: '',
    desc: '',
    img: File,
    price: 0,
    shopId:""
    
  };
  shopId: any
  submitted = false;
  constructor(private productService: ProductService , private shopService: ShopService, private route: ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
  }
  
  saveProduct(): void {
    // this.shopService.get()
    // setTimeout(()=>{
    //   window.location.replace(`/menu/${id}`)
    // }, 1500)
    const data = {
      name: this.product.name,
      dec: this.product.desc,
      img: this.product.img,
      price: this.product.price
    };

    this.shopId = this.route.snapshot.paramMap.get('id')
    console.log(this.shopId)
    this.productService.create(data, this.shopId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      
      // window.location.reload()
      let currentUrl = this.router.url
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl])
      })
}

    // fileSelect(event:event): void{
    //   console.log("You seleted something")
    // }
    fileSelect(event: any){
      if (event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.imagePreview = event.target.result;
        }
      }
    }
     newProduct(): void {
     this.submitted = false;
     this.product = {
      name: '',
      desc: "",
      img: "",
      price:0,

  };
}
searchName(): void {
  this.currentProduct = {};
  this.currentIndex = -1;

  this.productService.findByTitle(this.name)
    .subscribe({
      next: (data) => {
        this.prdct = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}

}
