import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

 

// Handle image change
onImageChange(event: any, row: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      row.image.value = reader.result as string; // Store image data
    };
    reader.readAsDataURL(file); // Convert image to base64
  }
}

// Remove image
removeImage(row: any) {
  row.image.value = ''; // Clear the image field
  // Optionally, clear the file input if needed
  const fileInput = document.querySelector(`#image-${row.name.value}`) as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; // Reset the input field
  }
}

// Sample data
dataSource = [
  {
    name: { value: 'Product 1' },
    image: { value: 'image1.jpg' },
    companyName: { value: 'Company A' },
    description: { value: 'Description 1' },
    price: { value: 100 },
    supplier: { value: 'Supplier 1' },
  },
  {
    name: { value: 'Product 2' },
    image: { value: 'image2.jpg' },
    companyName: { value: 'Company B' },
    description: { value: 'Description 2' },
    price: { value: 200 },
    supplier: { value: 'Supplier 2' },
  },
];

originalDataSource: any[] = JSON.parse(JSON.stringify(this.dataSource));

// Add a new row
addRow() {
  this.dataSource.push({
    name: { value: '' },
    image: { value: '' },
    companyName: { value: '' },
    description: { value: '' },
    price: { value: 0 },
    supplier: { value: '' },
  });
}

// Delete a row
deleteRow(index: number) {
  this.dataSource.splice(index, 1);
}

// Save changes
saveChanges() {
  console.log('Saved data:', this.dataSource);
  this.originalDataSource = JSON.parse(JSON.stringify(this.dataSource));
}

// Cancel changes
cancelChanges() {
  this.dataSource = JSON.parse(JSON.stringify(this.originalDataSource));
}

}