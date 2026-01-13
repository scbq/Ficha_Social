import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLista } from './personal-lista';

describe('PersonalLista', () => {
  let component: PersonalLista;
  let fixture: ComponentFixture<PersonalLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
