import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-only',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule], // إضافة CommonModule هنا
  templateUrl: './admin-only.component.html',
  styleUrls: ['./admin-only.component.css'],
})
export class AdminOnlyComponent implements OnInit {
  productForm: FormGroup; // النموذج التفاعلي
  isLoading = false; // لإدارة حالات التحميل
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      products: this.fb.array([]), // FormArray لإدارة المنتجات المتعددة
    });
  }

  ngOnInit(): void {
    this.loadProducts(); // تحميل المنتجات الأولية
  }

  // دالة للوصول إلى FormArray الخاص بالمنتجات
  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  // إضافة صف منتج جديد
  addRow(): void {
    const productGroup = this.fb.group({
      name: ['', Validators.required],
      image: [null], // الصورة كملف
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      supplier: ['', Validators.required],
    });
    this.products.push(productGroup);
  }

  // إزالة صف منتج
  deleteRow(index: number): void {
    const product = this.products.at(index).value;
    const productId = product.Id;

    if(productId){
      this.productService.deleteProducts(productId).subscribe(
        {
          next: () =>{
            this.products.removeAt(index);
          },
          error: (err) =>{
            this.errorMessage = 'Failed to delete the product.';
          }
        }
      )
    } else{
      console.error('Product id is missing.');
    }

    
  }

  // معالجة تغيير الصورة
  onImageChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      const productGroup = this.products.at(index) as FormGroup;
      productGroup.patchValue({ image: file }); // تحديث الحقل بالصورة
    }
  }

  // تحميل المنتجات من الخادم
  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.products.clear(); // مسح المنتجات الحالية
        response.forEach((product: any) => {
          const productGroup = this.fb.group({
            Id : [product.productId.value],
            name: [product.productName, Validators.required],
            image: [product.image, Validators.required], 
            companyName: [product.companyName, Validators.required],
            description: [product.description, Validators.required],
            price: [product.price, [Validators.required, Validators.min(1)]],
            supplier: [product.supplier, Validators.required],
          });
          this.products.push(productGroup);
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'فشل في تحميل المنتجات.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  

  // إلغاء التغييرات
  cancelChanges(): void {
    this.loadProducts(); // إعادة تحميل المنتجات للتخلص من التغييرات غير المحفوظة
  }


  saveProduct(index: number): void {
    const product = this.products.at(index).value;
    
    const formData = new FormData();
formData.append('name', product.name);
formData.append('companyName', product.companyName);
formData.append('description', product.description);
formData.append('price', product.price.toString());
formData.append('supplier', product.supplier);
formData.append('image', product.image); 


    this.productService.createProduct(formData).subscribe({
      next: () => {
        console.log('Product saved successfully!');
        this.products.at(index).patchValue({ isSaved: true });
      },
      error: (err) => {
        this.errorMessage = 'Failed to save the product.';
        console.error(err);
      },
    });
  }

  updateProduct(index: number): void {
    const product = this.products.at(index).value;
    const productId = product.Id; 
  
    if (productId) {
      const formData = new FormData();
      formData.append('Id', productId)
      formData.append('name', product.name);
      formData.append('companyName', product.companyName);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('supplier', product.supplier);
      formData.append('image', 'koko');
  
      this.productService.updateProduct(formData).subscribe({
        next: () => {
          console.log('Product updated successfully!');
          this.products.at(index).patchValue({ isUpdated: true });
        },
        error: (err) => {
          this.errorMessage = 'Failed to update the product.';
          console.error(err);
        },
      });
    } else {
      console.error('Product ID is missing.');
    }
  }

}