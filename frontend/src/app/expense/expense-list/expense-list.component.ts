import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../service/expense.service';
import { ISingleExpenseRes, IExpenseRes, Expense } from '../model/expense.model';
import { SnackBarService } from '../../shared/service/snack-bar.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[];
  total: any;
  displayedColumns: string[] = ['category', 'amount', 'date', 'body'];
  displayedTotalColumns: string[] = ['category', 'total', 'count'];
  expandedElement: Expense;

  constructor(private expenseService: ExpenseService,
              private alertService: SnackBarService) { }

  ngOnInit() {
    this.getExpenseList();

  }


  getExpenseList() {
    this.expenseService.getExpense().subscribe(
      (res: IExpenseRes) => {
        this.expenses = res.expenses.map((exp: ISingleExpenseRes) => new Expense(exp));
        this.total = res.total;
      },
      (error) => {
        this.alertService.open(`Can't load expenses, please reload the page.`, 'ok', 5000);
      }
    );
  }

  //todo get list by date from-to
  getListByParam(from, to) {

  }
}
