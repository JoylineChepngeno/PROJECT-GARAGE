import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashbboard } from './dashbboard';

describe('Dashbboard', () => {
  let component: Dashbboard;
  let fixture: ComponentFixture<Dashbboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashbboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashbboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
