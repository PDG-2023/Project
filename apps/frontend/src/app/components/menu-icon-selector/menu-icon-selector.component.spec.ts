import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuIconSelectorComponent } from './menu-icon-selector.component';

describe('MenuIconSelectorComponent', () => {
  let component: MenuIconSelectorComponent;
  let fixture: ComponentFixture<MenuIconSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuIconSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuIconSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
