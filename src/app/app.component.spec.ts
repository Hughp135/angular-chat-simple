import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-chat-window',
  template: '<p>Mock Chat Window Component</p>',
})
class MockChatWindowComponent {}

@Component({
  selector: 'app-channel-list',
  template: '<p>Mock Channel List Component</p>',
})
class MockChannelListComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockChatWindowComponent,
        MockChannelListComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
