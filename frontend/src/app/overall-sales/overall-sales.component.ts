import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-overall-sales',
  templateUrl: './overall-sales.component.html',
  styleUrls: ['./overall-sales.component.css']
})
export class OverallSalesComponent implements OnInit {
  salesData: any[] = [];
  customerId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('username') || '';
    if (this.customerId) {
      this.fetchSalesData();
    }
  }

  fetchSalesData(): void {
  const url = `http://localhost:3000/overall-sales/getCustomerOverallSales?custId=${this.customerId}`;
  this.http.get<any>(url).subscribe({
    next: (data) => {
      this.salesData = data.sales || [];
      console.log('Overall Sales:', this.salesData);
    },
    error: (err) => {
      console.error('Error fetching overall sales data:', err);
    }
  });
}

}
