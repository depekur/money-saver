import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { INewExpenseReq, IExpenseRes, INewExpenseRes } from '../model/expense.model';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient,
              private alertService: SnackBarService) {
  }

  addExpense(data: INewExpenseReq): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.post('/api/expense', data).subscribe(
        (res: INewExpenseRes|any) => {
          if (res.error) {
            let errors: string = '';

            Object.keys(res.errors).map(key => {
              res.errors[key].forEach(error => {
                errors += error + ' ';
              });
            });

            reject(errors);
          } else {
            resolve('New expense created!');
          }
        }, error => {
          reject(`Can't create expense. Reload page and try one more time.`);
        }
      );
    });
  }

  getExpense(): Observable<any> {
    return this.http.get('/api/expense');
  }
}
