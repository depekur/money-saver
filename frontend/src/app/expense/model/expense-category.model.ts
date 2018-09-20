export interface IExpenseCategory {
  id: number;
  category: string;
}

export interface INewExpenseCategoryReq {
  category: string;
}

export interface IDeleteExpenseCategoryRes {
  status: boolean;
}
