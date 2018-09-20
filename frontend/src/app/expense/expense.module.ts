import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-category.component';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ExpenseService } from './service/expense.service';
import { ExpenseCategoryService } from './service/expense-category.service';

@NgModule({
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    SharedModule
  ],
  declarations: [
    ExpenseComponent,
    ExpenseListComponent,
    AddExpenseComponent,
    AddExpenseCategoryComponent
  ],
  providers: [
    ExpenseService,
    ExpenseCategoryService
  ]
})
export class ExpenseModule { }
