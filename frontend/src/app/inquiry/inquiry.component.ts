import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.css']
})
export class InquiryComponent implements OnInit {
  inquiries: any[] = [];
  custId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.custId = localStorage.getItem('username') || '';

    if (!this.custId) {
      console.error('Customer ID not found in localStorage');
      return;
    }

    const url = `http://localhost:3000/inquiry/getCustomerInquiry?custId=${this.custId}`;

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.inquiries = data;
        console.log('Inquiries:', data);
      },
      error: (err) => {
        console.error('Error fetching inquiries', err);
      }
    });
  }
}
