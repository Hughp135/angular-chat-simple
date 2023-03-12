import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessageEnum } from 'src/generated/graphql';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: MessageEnum[] = [];
  @ViewChild('container') chatContainer!: ElementRef;
  hasMore = true;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit() {
    this.apiService.fetchLatest().subscribe((data) => {
      this.messages = data;
    });
  }

  fetchMore() {
    const lastMessage = this.messages[this.messages.length - 1];

    if (!lastMessage) {
      throw new Error('No messages have been loaded yet');
    }

    this.apiService.fetchMore(lastMessage.messageId).subscribe((data) => {
      if (data.length < 10) {
        this.hasMore = false;
      }

      if (data.length) {
        this.messages = [...this.messages, ...data];
        console.log(this.messages);
        setTimeout(() => {
          console.log(this.chatContainer.nativeElement);
          this.chatContainer.nativeElement.scrollTop =
            -this.chatContainer.nativeElement.scrollHeight;
        });
      }
    });
  }
}
