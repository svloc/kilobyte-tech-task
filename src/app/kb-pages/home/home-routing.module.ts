import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'client',
        loadChildren: () =>
          import('../client/client.module').then((m) => m.ClientModule),
      },
      {
        path: 'document',
        loadChildren: () =>
          import('../document/document.module').then((m) => m.DocumentModule),
      },
      {
        path: 'task',
        loadChildren: () =>
          import('../task/task.module').then((m) => m.TaskModule),
      },
      {
        path: 'payment',
        loadChildren: () =>
          import('../payment/payment.module').then((m) => m.PaymentModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
