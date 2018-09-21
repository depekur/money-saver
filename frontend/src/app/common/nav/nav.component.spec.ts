import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NavComponent } from './nav.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { Router } from '@angular/router';
import { ExpenseModule } from '../../expense/expense.module';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavComponent, PageNotFoundComponent ],
      imports: [RouterTestingModule.withRoutes(routes), SharedModule, ExpenseModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigate to "" redirects you to /', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/');
  }));

  it('navigate to expenses redirects you to /expenses', fakeAsync(() => {
    router.navigate(['expenses']);
    tick();
    expect(location.path()).toBe('/expenses');
  }));

  it('navigate to expense-category redirects you to /expense-category', fakeAsync(() => {
    router.navigate(['expense-category']);
    tick();
    expect(location.path()).toBe('/expense-category');
  }));
});
