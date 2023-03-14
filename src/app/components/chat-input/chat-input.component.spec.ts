import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatService } from 'src/app/services/chat.service';

import { ChatInputComponent } from './chat-input.component';

describe('ChatInputComponent', () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;
  let mockChatService: Partial<ChatService> = {
    postMessage: (text: string) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ReactiveFormsModule],
      declarations: [ChatInputComponent],
      providers: [{ provide: ChatService, useValue: mockChatService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call postMessage when send button is clicked', () => {
    spyOnAllFunctions(mockChatService);
    component.chatInput.setValue('Here is a message');
    component.onMessageSent();

    expect(mockChatService.postMessage).toHaveBeenCalledWith(
      'Here is a message'
    );
  });
});
