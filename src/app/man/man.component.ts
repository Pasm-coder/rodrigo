import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product3Service } from '../service/product3.service';
@Component({
  selector: 'app-man',
  templateUrl: './man.component.html',
  styleUrls: ['./man.component.sass']
})
export class ManComponent implements OnInit {
  productList!: any[];
 products: any[] = [];
 subTotal!: any;
 constructor(
   private product3_service: Product3Service,
   private router: Router
 ) {}
 
 ngOnInit() {
   this.product3_service.getAllProducts().subscribe({
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
 
   this.product3_service.loadCart();
   this.products = this.product3_service.getProduct();
 }
 
 //Add product to Cart
 addToCart(product: any) {
   if (!this.product3_service.productInCart(product)) {
     product.quantity = 1;
     this.product3_service.addToCart(product);
     this.products = [...this.product3_service.getProduct()];
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
   this.product3_service.removeProduct(product);
   this.products = this.product3_service.getProduct();
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



