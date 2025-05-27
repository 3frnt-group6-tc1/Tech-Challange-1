import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconNotebookComponent } from './icon-notebook.component';

describe('IconNotebookComponent', () => {
  let component: IconNotebookComponent;
  let fixture: ComponentFixture<IconNotebookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconNotebookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
