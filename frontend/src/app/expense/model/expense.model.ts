import * as moment from 'moment';

export interface INewExpenseReq {
  date: number;
  category: number;
  amount: number;
  body: string;
}

export interface INewExpenseRes {
  status: boolean;
}

export interface ISingleExpenseRes {
  id: number;
  date: number;
  category: string
  amount: number;
  body: string;
}

export interface IExpenseRes {
  total: any;
  expenses: ISingleExpenseRes[];
}

export class Expense {
  id: number;
  date: string;
  category: string;
  amount: number;
  body: string;

  constructor(data: ISingleExpenseRes) {
    this.id = data.id;
    this.category = data.category;
    this.amount = data.amount;
    this.body = data.body;
    this.date = moment.unix(data.date).format("D.MM.YYYY");
  }
}
