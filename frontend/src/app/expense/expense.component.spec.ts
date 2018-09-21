import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseComponent } from './expense.component';
import { SharedModule } from '../shared/shared.module';
import { routes } from './expense-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AddExpenseCategoryComponent } from './add-expense-category/add-expense-category.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExpenseComponent,
        AddExpenseCategoryComponent,
        AddExpenseComponent,
        ExpenseListComponent
      ],
      imports: [RouterTestingModule.withRoutes(routes), SharedModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
