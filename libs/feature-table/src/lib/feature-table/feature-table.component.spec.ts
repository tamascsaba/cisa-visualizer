import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureTableComponent } from './feature-table.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('FeatureTableComponent', () => {
  let component: FeatureTableComponent;
  let fixture: ComponentFixture<FeatureTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureTableComponent, NoopAnimationsModule],
      providers: [provideHttpClient(withInterceptorsFromDi())],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
