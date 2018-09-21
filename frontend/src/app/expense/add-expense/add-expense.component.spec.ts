import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AddExpenseComponent } from './add-expense.component';
import { ExpenseCategoryService } from '../service/expense-category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseService } from '../service/expense.service';
import { IExpenseCategory } from '../model/expense-category.model';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs/index';
import * as moment from 'moment';

function asObservable<T>(data: T): Observable<any> {
  let subject = new ReplaySubject<any>();
  subject.next(data);

  return subject.asObservable();
}

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;
  let expService: ExpenseService;
  let expCatService: ExpenseCategoryService;
  const niceAmounts = [
    '90',
    '123456,00',
    '123.77',
    '99.1',
    '99,1',
  ];
  const badAmounts = [
    'fwefwef',
    'fwqwq,we',
    '1111 00',
    '11,123',
    '999:213',
    '234.777',
    '123,77 a',
    '@134,56'
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpenseComponent ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule, BrowserAnimationsModule],
      providers: [ExpenseCategoryService, ExpenseService]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    expService = TestBed.get(ExpenseService);
    expCatService = TestBed.get(ExpenseCategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must have date getter', () => {
    expect(component.date).toBeTruthy();
  });

  it('must have category getter', () => {
    expect(component.category).toBeTruthy();
  });

  it('must have amount getter', () => {
    expect(component.amount).toBeTruthy();
  });

  it('must have body getter', () => {
    expect(component.body).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.expenseForm.valid).toBeFalsy();
  });



  it('category field is required', () => {
    const category = component.expenseForm.controls['category'];

    expect(category.valid).toBeFalsy();
    let errors = category.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('amount field is required', () => {
    const amount = component.expenseForm.controls['amount'];

    expect(amount.valid).toBeFalsy();
    let errors = amount.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('date field is required', () => {
    const date = component.expenseForm.controls['date'];

    date.setValue('');

    expect(date.valid).toBeFalsy();
    let errors = date.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('value of date field by default set to today', () => {
    const date = component.expenseForm.controls['date'];
    component.initForm();
    fixture.detectChanges();

    expect(moment(date.value.format()).isSame(moment(), 'day')).toBeTruthy();
  });

  it('body field have max length validator', () => {
    const body = component.expenseForm.controls['body'];
    const largeStr = `owimvoiwmvowmvowvowov
                      wjojfewjoiewjfooijfoiewfi9jfe
                      woimfi2f9i2mfo2if92mfmowimvoi
                      wmvowmvowvowovwjojfewjoiewjfa
                      ssdsadsadooijfoiewfi9jfewoimf
                      fewoimfi2f9i2mfo2if92mfm`;

    const smallStr = 'owimvoijojfewjoiewjfomfdp';
    let errors;

    body.setValue(largeStr);
    expect(body.valid).toBeFalsy();
    errors = body.errors || {};
    expect(errors['maxlength']).toBeTruthy();

    body.setValue(smallStr);
    expect(body.valid).toBeTruthy();
    errors = body.errors || {};
    expect(errors['maxlength']).toBeFalsy();
  });

  badAmounts.forEach((badAmount) => {
    it(`amount field DOESN'T accept ${badAmount} value`, () => {
      const amount = component.expenseForm.controls['amount'];
      amount.setValue(badAmount);
      expect(amount.value).toBe(badAmount);
      expect(amount.valid).toBeFalsy();

      let errors = amount.errors || {};
      expect(errors['pattern']).toBeTruthy();
    });
  });

  niceAmounts.forEach((niceAmount) => {
    it(`amount field accept ${niceAmount} value`, () => {
      const amount = component.expenseForm.controls['amount'];
      amount.setValue(niceAmount);
      expect(amount.value).toBe(niceAmount);
      expect(amount.valid).toBeTruthy();

      let errors = amount.errors || {};
      expect(errors['pattern']).toBeFalsy();
    });
  });

  it('onSubmit should change isSubmitted trigger', () => {
    expect(component.isSubmitted).toBeFalsy();
    component.category.setValue('1');
    component.amount.setValue('1');
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isSubmitted).toBeTruthy();
  });

  it('onSubmit should do nothing if form already submitted or invalid', () => {
    component.onSubmit();
    fixture.detectChanges();
    expect(component.isSubmitted).toBeFalsy();
  });

  it('onSubmit should change isSubmitted back to false when Promise resolve', fakeAsync(() => {
    component.category.setValue('test');
    spyOn(expCatService, 'addCategory').and.returnValue(Promise.resolve('msg'));
    component.onSubmit();
    tick(8000);
    fixture.detectChanges();
    expect(component.isSubmitted).toBeFalsy();
  }));


  it('getExpenseCategory set subscription that update expenseCategories', fakeAsync(() => {
    const response: IExpenseCategory[] = [
      {id: 1, category: 'Food'},
      {id: 2, category: 'Movie'},
      {id: 3, category: 'Medical'},
    ];

    expect(component.expenseCategories).toBeFalsy();

    spyOnProperty(expCatService, 'categories$').and.returnValue(asObservable(response));
    component.getExpenseCategory();
    tick();

    fixture.detectChanges();
    expect(component.expenseCategories).toEqual(response);
  }));

  it('reset form func actually reset form', () => {
    component.category.setValue('1');
    component.amount.setValue('1');
    expect(component.category.value).toBe('1');
    expect(component.amount.value).toBe('1');

    component.resetForm();

    expect(component.category.value).toBeFalsy();
    expect(component.amount.value).toBeFalsy();

    expect(component.category.errors['require']).toBeFalsy();
    expect(component.amount.errors['require']).toBeFalsy();
  });

});
