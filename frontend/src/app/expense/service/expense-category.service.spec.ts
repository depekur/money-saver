import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseCategoryService } from './expense-category.service';
import { SharedModule } from '../../shared/shared.module';

describe('ExpenseCategoryService', () => {
  let service: ExpenseCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExpenseCategoryService],
      imports: [HttpClientModule, SharedModule]
    });

    service = TestBed.get(ExpenseCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
