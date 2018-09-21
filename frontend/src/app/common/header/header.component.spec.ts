import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from '../nav/nav.component';
import { HeaderComponent } from './header.component';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CONFIG } from '../../CONFIG';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let logoEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, NavComponent ],
      imports: [ SharedModule ],
    })
    .compileComponents();


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    logoEl = fixture.debugElement.query(By.css('.logo'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain logo element', () => {
    expect(logoEl.nativeElement).toBeTruthy();
  });

  it('logo element must have correct title & content', () => {
    expect(logoEl.nativeElement.text.trim()).toBe(CONFIG.appTitle);
    expect(logoEl.nativeElement.title.trim()).toBe(CONFIG.appTitle);
  });
});
