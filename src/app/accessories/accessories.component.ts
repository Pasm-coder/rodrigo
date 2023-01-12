import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product4Service } from '../service/product4.service';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.sass']
})
export class AccessoriesComponent implements OnInit{
  productList!: any[];
  products: any[] = [];
  subTotal!: any;
  constructor(
    private product4_service: Product4Service,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.product4_service.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => {
        console.log('Request Completed');
      },
    });
  
    this.product4_service.loadCart();
    this.products = this.product4_service.getProduct();
  }
  
  //Add product to Cart
  addToCart(product: any) {
    if (!this.product4_service.productInCart(product)) {
      product.quantity = 1;
      this.product4_service.addToCart(product);
      this.products = [...this.product4_service.getProduct()];
      this.subTotal = product.price;
    }
  }
  
  //Change sub total amount
  // changeSubTotal(product: any, index: any) {
  //   const qty = product.quantity;
  //   const amt = product.price;
  
  //   this.subTotal = amt * qty;
  
  //   this.product_service.saveCart();
  // }
  
  //Remove a Product from Cart
  removeFromCart(product: any) {
    this.product4_service.removeProduct(product);
    this.products = this.product4_service.getProduct();
  }
  
  //Calculate Total
  
  get total() {
    return this.products?.reduce(
      (sum, product) => ({
        quantity: 1,
        price: sum.price + product.quantity * product.price,
      }),
      { quantity: 1, price: 0 }
    ).price;
  }
  
  checkout() {
    localStorage.setItem('cart_total', JSON.stringify(this.total));
    this.router.navigate(['/payment']);
  }

}
