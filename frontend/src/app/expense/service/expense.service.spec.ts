import { TestBed } from '@angular/core/testing';
import { ExpenseService } from './expense.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';

describe('ExpenseService', () => {
  let service: ExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseService],
      imports: [HttpClientModule, SharedModule]
    });

    service = TestBed.get(ExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
