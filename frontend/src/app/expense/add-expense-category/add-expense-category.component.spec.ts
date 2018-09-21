import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddExpenseCategoryComponent } from './add-expense-category.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseCategoryService } from '../service/expense-category.service';
import { IExpenseCategory } from '../model/expense-category.model';
import { ReplaySubject, Observable } from 'rxjs';


function asObservable<T>(data: T): Observable<any> {
  let subject = new ReplaySubject<any>();
  subject.next(data);

  return subject.asObservable();
}

describe('AddExpenseCategoryComponent', () => {
  let component: AddExpenseCategoryComponent;
  let fixture: ComponentFixture<AddExpenseCategoryComponent>;
  let expService: ExpenseCategoryService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpenseCategoryComponent ],
      imports: [ReactiveFormsModule, FormsModule, SharedModule, BrowserAnimationsModule],
      providers: [ExpenseCategoryService]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseCategoryComponent);
    component = fixture.componentInstance;
    expService = TestBed.get(ExpenseCategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must have category getter', () => {
    expect(component.category).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.expenseCategoryForm.valid).toBeFalsy();
  });

  it('category field is required', () => {
    const category = component.expenseCategoryForm.controls['category'];

    expect(category.valid).toBeFalsy();
    let errors = category.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('category field have max length validator', () => {
    const category = component.expenseCategoryForm.controls['category'];
    const largeStr = 'owimvoiwmvowmvowvowovwjojfewjoiewjfom';
    const smallStr = 'owimvoijojfewjoiewjfomfdp';
    let errors;

    category.setValue(largeStr);
    expect(category.valid).toBeFalsy();
    errors = category.errors || {};
    expect(errors['maxlength']).toBeTruthy();

    category.setValue(smallStr);
    expect(category.valid).toBeTruthy();
    errors = category.errors || {};
    expect(errors['maxlength']).toBeFalsy();
  });

  it('onSubmit should change isSubmitted trigger', () => {
    expect(component.isSubmitted).toBeFalsy();
    component.category.setValue('test');
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
    spyOn(expService, 'addCategory').and.returnValue(Promise.resolve('msg'));
    component.onSubmit();
    tick(8000);
    fixture.detectChanges();
    expect(component.isSubmitted).toBeFalsy();
  }));

  it('getExpenseCategory set subscription that update expenseCategories', fakeAsync(() => {
    const response: IExpenseCategory[] = [
      {id: 1, category: "Food"},
      {id: 2, category: "Movie"},
      {id: 3, category: "Medical"},
    ];

    expect(component.expenseCategories).toBeFalsy();

    spyOnProperty(expService, 'categories$').and.returnValue(asObservable(response));
    component.getExpenseCategory();
    tick();

    fixture.detectChanges();
    expect(component.expenseCategories).toEqual(response);
  }));
});
