import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChatService, MessageEntry } from 'src/app/services/chat.service';

import { ChatWindowComponent } from './chat-window.component';

@Component({
  selector: 'app-chat-input',
  template: '<p>Mock Chat Input Component</p>',
})
class MockChatInputComponent {}

describe('ChatWindowComponent', () => {
  let component: ChatWindowComponent;
  let fixture: ComponentFixture<ChatWindowComponent>;
  let messagesSubject: Observable<MessageEntry[]>;

  beforeEach(async () => {
    messagesSubject = new BehaviorSubject<MessageEntry[]>([]);
    await TestBed.configureTestingModule({
      declarations: [ChatWindowComponent, MockChatInputComponent],
      imports: [FontAwesomeModule],
      providers: [
        {
          provide: ChatService,
          useValue: {
            messages: messagesSubject,
          },
        },
        {
          provide: ChannelsService,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
