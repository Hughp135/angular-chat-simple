import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  chatInput = new FormControl('');
  sendIcon = faPaperPlane;

  constructor(private readonly chatService: ChatService) {}

  onMessageSent() {
    if (this.chatInput.value) {
      const text = this.chatInput.value;
      this.chatService.postMessage(text);
      this.chatInput.patchValue('');
    }
  }
}
