import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: any[] = []; // تخزين المنتجات في قائمة

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data:any) => {
        this.products = data; // تخزين المنتجات في القائمة
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }
 

  // Cart array to hold selected products
  cart: any[] = [];

  addToCart(product: any) {
    this.cart.push(product);
    console.log('Product added to cart:', product);
  }
}