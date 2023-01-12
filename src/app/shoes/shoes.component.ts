import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product2Service } from '../service/product2.service';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.sass']
})
export class ShoesComponent {

  productList!: any[];
 products: any[] = [];
 subTotal!: any;
 constructor(
   private product2_service: Product2Service,
   private router: Router
 ) {}
 
 ngOnInit() {
   this.product2_service.getAllProducts().subscribe({
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
 
   this.product2_service.loadCart();
   this.products = this.product2_service.getProduct();
 }
 
 //Add product to Cart
 addToCart(product: any) {
   if (!this.product2_service.productInCart(product)) {
     product.quantity = 1;
     this.product2_service.addToCart(product);
     this.products = [...this.product2_service.getProduct()];
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
   this.product2_service.removeProduct(product);
   this.products = this.product2_service.getProduct();
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
