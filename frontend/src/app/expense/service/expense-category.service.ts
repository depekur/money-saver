import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { IDeleteExpenseCategoryRes, IExpenseCategory, INewExpenseCategoryReq } from '../model/expense-category.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseCategoryService {
  expenseCategories$ = new ReplaySubject<any>();
  expenseCategories: IExpenseCategory[];

  constructor(private http: HttpClient,
              private alertService: SnackBarService) {
    this.getCategories();
  }

  get categories$(): Observable<IExpenseCategory[]> {
    return this.expenseCategories$.asObservable();
  }

  getCategories() {
    if (this.expenseCategories) {
      this.expenseCategories$.next(this.expenseCategories);
    } else {
      this.http.get('/api/expense-category').subscribe(
        (res: IExpenseCategory[]) => {
          this.expenseCategories = res;
          this.expenseCategories$.next(this.expenseCategories);
        },
        (error) => {
          this.alertService.open(`Can't load expense category, please reload page`, 'ok', 5000);
        }
      );
    }
  }

  addCategory(data: INewExpenseCategoryReq): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/expense-category', data).subscribe(
        (res: IExpenseCategory|any) => {
          if (res.error) {
            reject(res.errors.category[0]);
          } else {
            this.expenseCategories.push(res);
            this.expenseCategories$.next(this.expenseCategories);
            resolve('Expense category created!');
          }
        }, error => {
          reject(`Can't add new category. Reload page and try one more time.`);
        }
      );
    });
  }

  deleteCategory(id: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.delete(`/api/expense-category/${id}`).subscribe(
        (res: IDeleteExpenseCategoryRes|any) => {
          if (res.status) {
            resolve('Category successfully deleted!');

            this.expenseCategories = this.expenseCategories.filter((cat) => {
              return cat.id !== id;
            });
            this.expenseCategories$.next(this.expenseCategories);
          } else if (res.error) {
            reject(res.error);
          } else {
            reject(`Can't delete category. Try to reload page and repeat`);
          }
        }, error => {
          reject(`Can't delete category. Try to reload page and repeat`);
        }
      );
    });
  }

}
