import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeerPage } from './leer.page';

describe('LeerPage', () => {
  let component: LeerPage;
  let fixture: ComponentFixture<LeerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function async(arg0: () => void): jasmine.ImplementationCallback {
  throw new Error('Function not implemented.');
}
