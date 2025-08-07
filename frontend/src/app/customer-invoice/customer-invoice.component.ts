import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {
  invoices: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const customerId = localStorage.getItem('username'); // assuming same key is used

    if (!customerId) {
      console.error('No customer ID found in localStorage');
      return;
    }

    const url = `http://localhost:3000/customer-invoice/fetch-customer-invoice/${customerId}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        this.invoices = res.invoices || [];
        console.log('Fetched customer invoices:', this.invoices);
      },
      error: (err) => {
        console.error('Error fetching customer invoices:', err);
      }
    });
  }

  viewPdf(invoiceNo: string | undefined) {
  if (!invoiceNo) {
    console.error('Invoice number is undefined. Cannot navigate.');
    return;
  }
  this.router.navigate(['/pdf-viewer', invoiceNo]);
}


  formatSapDate(dateString: string | undefined | null): string {
  if (!dateString) return ''; // Handle undefined or null
  // Only format if it's in yyyymmdd format
  if (/^\d{8}$/.test(dateString)) {
    return dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
  }
  return dateString; // Already in correct format
}

}
