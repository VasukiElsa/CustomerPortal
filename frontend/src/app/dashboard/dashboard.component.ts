import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile: any = null;
  inquiryData: any = null;
  showProfile = false;
  customerId = '';
  activeSection: string = ''; // Initialize as empty string

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.customerId = localStorage.getItem('username') || '';

    // Redirect to login if not logged in
    if (!this.customerId) {
      this.router.navigate(['/']);
      return;
    }

    this.loadProfile();
    this.loadInquiry();

    const savedActiveSection = localStorage.getItem('activeDashboardSection');
    if (savedActiveSection) {
      this.activeSection = savedActiveSection;
    }
  }

  toggleProfileDropdown(): void {
    this.showProfile = !this.showProfile;
  }

  selectSection(section: string): void {
    this.activeSection = section;
    // Save activeSection to localStorage whenever it changes
    localStorage.setItem('activeDashboardSection', section);
  }

  loadProfile(): void {
    if (!this.customerId) return;

    this.http.get<any>(`http://localhost:3000/profile/getCustomerProfile?custId=${this.customerId}`)
      .subscribe({
        next: (data) => {
          this.profile = data;
        },
        error: (err) => {
          console.error('Failed to load profile:', err);
        }
      });
  }

  loadInquiry(): void {
    if (!this.customerId) return;

    const params = new HttpParams().set('custId', this.customerId);

    this.http.get<any>('http://localhost:3000/inquiry/getCustomerInquiry', { params })
      .subscribe({
        next: (data) => {
          this.inquiryData = data;
          // Store to localStorage for use in new page
          localStorage.setItem('inquiryData', JSON.stringify(data));
        },
        error: (err) => {
          console.error('Failed to load inquiry data:', err);
        }
      });
  }

  goToInquiry(): void {
    this.router.navigate(['/inquiry']);
  }

  goToSalesOrder(): void {
    this.router.navigate(['/salesorder']);
  }

  goToDelivery(): void {
    this.router.navigate(['/delivery']);
  }

  goToCustomerInvoice(): void {
    this.router.navigate(['/customer-invoice']);
  }

  goToAging(): void {
    this.router.navigate(['/aging']);
  }

  goToCdMemo(): void {
    this.router.navigate(['/cdmemo']);
  }

  goToOverallSales(): void {
    this.router.navigate(['/overall-sales']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}