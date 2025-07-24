import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  deliveries: any[] = [];
  custId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.custId = localStorage.getItem('username') || '';
    if (!this.custId) {
      console.error('Customer ID not found in localStorage');
      return;
    }

    const url = `http://localhost:3000/delivery/getDeliveries?custId=${this.custId}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.deliveries = data;
        console.log('Deliveries:', data);
      },
      error: (err) => {
        console.error('Error fetching deliveries', err);
      }
    });
  }
}
