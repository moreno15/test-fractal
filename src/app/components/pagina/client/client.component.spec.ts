import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalComponent } from './client.component';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
