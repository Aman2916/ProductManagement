import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('productForm') productForm!: NgForm;
  productName = '';
  category = '';
  price: number | null = null;

  products: Product[] = [];
  editingProductId: string | null = null;

  message = '';
  messageType: 'success' | 'error' = 'success';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  editProduct(product: Product) {
    this.editingProductId = product._id!;

    this.productForm.resetForm();
    this.productName = product.productName;
    this.category = product.category;
    this.price = product.price;
  }
  saveProduct() {
    if (!this.productName || !this.category || this.price === null) return;

    const productData = {
      productName: this.productName,
      category: this.category,
      price: this.price,
    };

    if (this.editingProductId) {
      this.http
        .put(
          `http://localhost:3000/api/products/${this.editingProductId}`,
          productData
        )
        .subscribe(() => {
          this.message = 'Product updated successfully';
          this.messageType = 'success';
          this.resetForm();
          this.loadProducts();
        });
    } else {
      this.http
        .post('http://localhost:3000/api/products', productData)
        .subscribe(() => {
          this.message = 'Product added successfully';
          this.messageType = 'success';
          this.resetForm();
          this.loadProducts();
        });
    }
  }

  deleteProduct(id: string) {
    this.http
      .delete(`http://localhost:3000/api/products/${id}`)
      .subscribe(() => {
        this.message = 'Product deleted successfully';
        this.messageType = 'error';
        this.loadProducts();
      });
  }

  loadProducts() {
    this.http
      .get<Product[]>('http://localhost:3000/api/products')
      .subscribe((data) => (this.products = data));
  }

  resetForm() {
    this.productForm.resetForm();
    this.editingProductId = null;
  }
}
