import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {path: '',  loadChildren: './expense/expense.module#ExpenseModule'},
    {path: '**', component: PageNotFoundComponent}
    ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
