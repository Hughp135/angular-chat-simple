import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MessageEnum } from 'src/generated/graphql';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: MessageEnum[] = [];

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
      this.messages = [...this.messages, ...data];
      console.log(this.messages);
    });
  }
}
