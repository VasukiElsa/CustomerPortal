import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InquiryComponent } from './inquiry/inquiry.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { CustomerInvoiceComponent } from './customer-invoice/customer-invoice.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { AgingComponent } from './aging/aging.component';
import { CdMemoComponent } from './cd-memo/cd-memo.component';
import { OverallSalesComponent } from './overall-sales/overall-sales.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'inquiry', component: InquiryComponent, canActivate: [AuthGuard] },
  { path: 'salesorder', component: SalesOrderComponent, canActivate: [AuthGuard] },
  { path: 'delivery', component: DeliveryComponent, canActivate: [AuthGuard] },
  { path: 'customer-invoice', component: CustomerInvoiceComponent, canActivate: [AuthGuard] },
  { path: 'pdf-viewer/:invoiceNumber', component: PdfViewerComponent, canActivate: [AuthGuard] },
  { path: 'aging', component: AgingComponent, canActivate: [AuthGuard] },
  { path: 'cdmemo', component: CdMemoComponent, canActivate: [AuthGuard] },
  { path: 'overall-sales', component: OverallSalesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
