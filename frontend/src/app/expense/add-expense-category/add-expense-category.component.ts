import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseCategoryService } from '../service/expense-category.service';
import { Subscription } from 'rxjs/index';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { IExpenseCategory } from '../model/expense-category.model';

@Component({
  selector: 'app-add-expense-category',
  templateUrl: './add-expense-category.component.html',
  styleUrls: ['./add-expense-category.component.scss']
})
export class AddExpenseCategoryComponent implements OnInit, OnDestroy {
  expenseCategoryForm: FormGroup;
  expenseCategories: IExpenseCategory[];
  expenseCategoriesSubscription: Subscription;
  isSubmitted: boolean = false;
  serverMessage: string;

  constructor(private expenseCategoryService: ExpenseCategoryService,
              private alertService: SnackBarService) { }

  ngOnInit() {
    this.initForm();
    this.getExpenseCategory();
  }

  ngOnDestroy() {
    this.expenseCategoriesSubscription.unsubscribe();
  }

  getExpenseCategory(): void {
    this.expenseCategoriesSubscription = this.expenseCategoryService.categories$
      .subscribe(
        (categories: IExpenseCategory[]) => {
          this.expenseCategories = categories;
        }
      );
  }

  initForm(): void {
    this.expenseCategoryForm = new FormGroup({
      category: new FormControl('', [
        Validators.required,
      ])
    });
  }

  onSubmit(): void {
    if (!this.expenseCategoryForm.valid || this.isSubmitted) { return; }

    this.isSubmitted = true;

    this.expenseCategoryService.addCategory(this.expenseCategoryForm.value).then(
      (msg) => {
        this.alertService.open(msg, 'ok');
        this.isSubmitted = false;
      }, (error) => {
        this.isSubmitted = false;
        this.alertService.open(error, 'ok', 5000);
      }
    );
  }

  deleteCategory(id): void {
    this.expenseCategoryService.deleteCategory(id).then(
      (msg) => {
        this.alertService.open(msg, 'ok', 5000);
      }, (error) => {
        this.alertService.open(error, 'ok', 5000);
      }
    );
  }

  get category() { return this.expenseCategoryForm.get('category'); }
}
