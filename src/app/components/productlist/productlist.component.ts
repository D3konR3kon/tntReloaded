import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/services/product.service';
import { ShopService} from 'src/app/services/shop.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products?: Product[]
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';
  shopId: any
  constructor(private productService: ProductService, private shopService: ShopService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.getAllProducts(id).subscribe({
      next: data => {
        this.products = data
        console.log(data)
      },
      error: e => console.error(e)
    })
  }

  refreshList(): void {
    this.getAll();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveTutorial(product: any, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
    console.log("We are here")
  }

  removeAllProducts(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.deleteAll(id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });

      window.location.reload();
  }

  searchName(): void {
    this.currentProduct = {};
    this.currentIndex = -1;

    this.productService.findByTitle(this.name)
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}
