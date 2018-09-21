import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';

export const routes = [
  {path: '',  loadChildren: './expense/expense.module#ExpenseModule'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
