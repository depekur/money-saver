import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ExpenseListComponent } from './expense-list.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExpenseService } from '../service/expense.service';
import { IExpenseRes, Expense } from '../model/expense.model';
import { Observable, ReplaySubject } from 'rxjs/index';

function asObservable(data: any): Observable<any> {
  let subject = new ReplaySubject<any>();

  subject.next(data);

  return subject.asObservable();
}

describe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let service: ExpenseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseListComponent ],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [ExpenseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ExpenseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getExpenseList should set expenses and total variables', fakeAsync(() => {
    const response = {
      total: [
        {name: "Apartments", sum: 300.89, count: 1},
      ],
      expenses: [
        {id: 1, date: 1537390800, amount: 9999, body: "holy cow! ", category: "Communal"},
      ]
    };

    let expenses = response.expenses.map(d => new Expense(d));

    expect(component.expenses).toBeFalsy();
    expect(component.total).toBeFalsy();

    spyOn(service, 'getExpense').and.returnValue(asObservable(response));
    component.getExpenseList();
    tick();

    fixture.detectChanges();
    expect(component.expenses[0].id).toBe(expenses[0].id);
    expect(component.expenses[0].date).toBe(expenses[0].date);
    expect(component.expenses[0].amount).toBe(expenses[0].amount);
    expect(component.expenses[0].body).toBe(expenses[0].body);
    expect(component.expenses[0].category).toBe(expenses[0].category);
    expect(component.total).toBe(response.total);
  }));
});
