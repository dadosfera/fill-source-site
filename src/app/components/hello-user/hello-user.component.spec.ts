import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelloUserComponent } from './hello-user.component';

describe('HelloUserComponent', () => {
  let component: HelloUserComponent;
  let fixture: ComponentFixture<HelloUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelloUserComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelloUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
