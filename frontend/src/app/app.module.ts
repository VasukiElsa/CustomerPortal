import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { DeliveryComponent } from './delivery/delivery.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'inquiry', component: InquiryComponent },
  { path: 'salesorder', component: SalesOrderComponent },
  { path: 'delivery', component: DeliveryComponent }
  // You can add more routes here if needed
];

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, InquiryComponent, SalesOrderComponent, DeliveryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CommonModule  // 👈 This is the important part
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
