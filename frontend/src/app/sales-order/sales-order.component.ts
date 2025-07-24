import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css']
})
export class SalesOrderComponent implements OnInit {
  salesOrders: any[] = [];
  custId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.custId = localStorage.getItem('username') || '';

    if (!this.custId) {
      console.error('Customer ID not found');
      return;
    }

    const url = `http://localhost:3000/salesorder/getSalesOrders?custId=${this.custId}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.salesOrders = data;
        console.log('Sales Orders:', data);
      },
      error: (err) => {
        console.error('Error fetching sales orders:', err);
      }
    });
  }
}
