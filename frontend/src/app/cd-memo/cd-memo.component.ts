import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cd-memo',
  templateUrl: './cd-memo.component.html',
  styleUrls: ['./cd-memo.component.css']
})
export class CdMemoComponent implements OnInit {
  combinedData: any[] = [];
  customerId: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('username') || '';
    if (this.customerId) {
      this.fetchCdMemo();
    }
  }

  fetchCdMemo(): void {
    const url = `http://localhost:3000/cdmemo/getCustomerCdMemo?custId=${this.customerId}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        const headers = data.headers || [];
        const items = data.items || [];

        // Combine item with corresponding header
        this.combinedData = items.map((item: any) => {
          const matchingHeader = headers.find((h: any) => h.BILLING_DOC === item.BILLING_DOC);
          return {
            ...item,
            ...matchingHeader  // merges header fields into item row
          };
        });

        console.log('Combined CD Memo Data:', this.combinedData);
      },
      error: (err) => {
        console.error('Error fetching CD Memo data:', err);
      }
    });
  }
}
