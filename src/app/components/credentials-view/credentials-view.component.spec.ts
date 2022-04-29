import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredentialsViewComponent } from './credentials-view.component';

describe('CredentialsViewComponent', () => {
  let component: CredentialsViewComponent;
  let fixture: ComponentFixture<CredentialsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CredentialsViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CredentialsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
