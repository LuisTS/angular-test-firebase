import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AlertButtonComponent } from './alert-button.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { MessageService } from '../message.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;
  let serviceStub: any;

  let service: MessageService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {

    // serviceStub = {
    //   getContent: () => of('You have been warned'),
    // };

    TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [
        MessageService,
        // { provide: MessageService, useValue: serviceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(MessageService);
    spy = spyOn(service, 'getFirebaseContent').and.returnValue(of([{testAlert: 'You have been warned!'}]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a message with \'warn\'', () => {
    expect(component.severity).toBe(423);
  });

  it('should have a severity level gratest then 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  it('should have an h1 tag of `Alert Button`', () => {
    expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
  });

  // Async
  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    // tick(499); // fail
    tick(500); // passes
    expect(component.hideContent).toBeFalsy();
  }));

  it('should have message content defined from an observable', () => {
    component.content.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toEqual([{ testAlert: 'You have been warned!' }]);
    });
  });

  it('should call getContent one time and update the view', () => {
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.all().length).toEqual(1);
    expect(de.query(By.css('.message-body')).nativeElement.innerText).toContain('warn');
  });

});
