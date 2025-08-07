import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-aging',
  templateUrl: './aging.component.html',
  styleUrls: ['./aging.component.css']
})
export class AgingComponent implements OnInit {
  agingData: any[] = [];
  customerId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('username') || '';
    if (this.customerId) {
      this.fetchAgingData();
    }
  }

  fetchAgingData(): void {
    const url = `http://localhost:3000/aging/getCustomerAging?custId=${this.customerId}`;
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.agingData = data;
        console.log('Aging Data:', data);
      },
      error: (err) => {
        console.error('Error fetching aging data:', err);
      }
    });
  }
}
