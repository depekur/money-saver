import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ExpenseService } from '../service/expense.service';
import { Subscription } from 'rxjs';
import { INewExpenseReq } from '../model/expense.model';
import { ExpenseCategoryService } from '../service/expense-category.service';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { IExpenseCategory } from '../model/expense-category.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  expenseForm: FormGroup;
  isSubmitted: boolean = false;
  expenseCategoriesSubscription: Subscription;
  expenseCategories: IExpenseCategory[];

  constructor(private expenseService: ExpenseService,
              private expenseCategoryService: ExpenseCategoryService,
              private alertService: SnackBarService) { }

  ngOnInit() {
    this.initForm();
    this.getExpenseCategory();
  }

  ngOnDestroy() {
    this.expenseCategoriesSubscription.unsubscribe();
  }

  getExpenseCategory() {
    this.expenseCategoriesSubscription = this.expenseCategoryService.categories$
      .subscribe(
        (categories: IExpenseCategory[]) => {
          this.expenseCategories = categories;
        }
      );
  }

  initForm() {
    this.expenseForm = new FormGroup({
      date: new FormControl(moment(), [
        Validators.required,
      ]),
      category: new FormControl('', [
        Validators.required,
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{1,99}([,.][0-9]{1,2})?$/)
      ]),
      body: new FormControl('', [
        Validators.maxLength(160)
      ]),
    });
  }

  onSubmit() {
    if (!this.expenseForm.valid || this.isSubmitted) { return; }

    this.isSubmitted = true;

    let data: INewExpenseReq = {
      date: this.normalizeDate(this.date.value),
      category: parseInt(this.category.value),
      amount: parseFloat(this.amount.value.replace(',', '.')),
      body: this.body.value
    };

    this.expenseService.addExpense(data).then(
      (msg) => {
        this.alertService.open(msg, 'ok');
        this.isSubmitted = false;
      }, (error) => {
        this.isSubmitted = false;
        this.alertService.open(error, 'ok', 5000);
      }
    );
  }

  resetForm(formDirective) {
    formDirective.resetForm();
    this.expenseForm.reset();
    this.initForm();
  }

  /**
   * set time to 00:00 with gmt time zone of given date
   * we need this for correct search by date in database
   */
  private normalizeDate(date): number {
    return date.startOf('day').unix();
  }

  get date() { return this.expenseForm.get('date'); }
  get category() { return this.expenseForm.get('category'); }
  get amount() { return this.expenseForm.get('amount'); }
  get body() { return this.expenseForm.get('body'); }
}
