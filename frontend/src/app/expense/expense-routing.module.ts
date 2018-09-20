import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-category.component';

const routes: Routes = [{
  path: '', component: ExpenseComponent,
  children: [
    {path: '', component: AddExpenseComponent},
    {path: 'expenses',  component: ExpenseListComponent},
    {path: 'expense-category',  component: AddExpenseCategoryComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule {
}
