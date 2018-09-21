import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { PageNotFoundComponent } from './common/page-not-found/page-not-found.component';
import { NavComponent } from './common/nav/nav.component';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HeaderComponent, PageNotFoundComponent, NavComponent
      ],
      imports: [RouterTestingModule.withRoutes(routes), SharedModule],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
