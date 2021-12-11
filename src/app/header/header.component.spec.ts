import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Digital Assignment – Posts & Comments'`, () => { 
    expect(component.title).toEqual('Digital Assignment – Posts & Comments');
  });

  it('should render title', () => { 
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.banner')?.textContent).toContain('Digital Assignment – Posts & Comments');
  });
});
