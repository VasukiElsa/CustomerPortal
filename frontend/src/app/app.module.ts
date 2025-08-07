import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { SafeUrlPipe } from './safe-url.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AgingComponent } from './aging/aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { OverallSalesComponent } from './overall-sales/overall-sales.component'; // 👈 Import routing module here

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    InquiryComponent,
    SalesOrderComponent,
    DeliveryComponent,
    CustomerInvoiceComponent,
    PdfViewerComponent,
    SafeUrlPipe,
    AgingComponent,
    CdMemoComponent,
    OverallSalesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule // 👈 Add AppRoutingModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
