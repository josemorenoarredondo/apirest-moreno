import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearExpedienteComponent } from './crear-expediente.component';

describe('CrearExpedienteComponent', () => {
  let component: CrearExpedienteComponent;
  let fixture: ComponentFixture<CrearExpedienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearExpedienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearExpedienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
