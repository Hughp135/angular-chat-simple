import { Component, Input, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ChannelId, MessageEnum, UserId } from 'src/generated/graphql';
import {
  faArrowUp,
  faArrowDown,
  faPaperPlane,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subject, Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ChannelsService } from 'src/app/services/channels.service';

type MessageEntry = MessageEnum & { error?: boolean };

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  private channelSubscription?: Subscription;
  messages: MessageEntry[] = [];
  hasMoreMessages = true;
  arrowUpIcon = faArrowUp;
  arrowDownIcon = faArrowDown;
  sendIcon = faPaperPlane;
  errorIcon = faCircleExclamation;
  loading = true;
  chatInput = new FormControl('', Validators.required);

  selectedChannel: Observable<ChannelId>;
  selectedUser: Observable<UserId>;
  readMoreButtonClicked = new Subject<boolean>();

  constructor(
    private readonly apiService: ApiService,
    private readonly channelsService: ChannelsService
  ) {
    this.selectedChannel = channelsService.selectedChannel;
    this.selectedUser = channelsService.selectedUser;
  }

  ngOnInit() {
    this.selectedChannel.subscribe(() => {
      this.fetchLatest();
    });
    this.readMoreButtonClicked.subscribe((old) => {
      console.log('button clicked', old);
      if (!old && !this.messages.length) {
        return this.fetchLatest();
      }

      this.fetchMore(old);
    });
  }

  fetchLatest() {
    if (this.channelSubscription) {
      this.channelSubscription.unsubscribe();
    }
    this.loading = true;
    this.channelSubscription = this.apiService
      .fetchLatest(this.channelsService.currentChannel)
      .subscribe((data) => {
        this.messages = data;
        this.loading = false;
        this.hasMoreMessages = data.length === 10;
      });
  }

  fetchMore(old: boolean) {
    const lastMessage = old
      ? this.messages[this.messages.length - 1]
      : this.messages[0];

    this.apiService
      .fetchMore(
        this.channelsService.currentChannel,
        lastMessage.messageId,
        old
      )
      .subscribe((data) => {
        if (old && data.length < 10) {
          this.hasMoreMessages = false;
        }

        if (data.length) {
          this.messages = old
            ? [...this.messages, ...data]
            : [...data, ...this.messages];
        }
      });
  }

  onMessageSent() {
    // if (this.chatInput.value) {
    //   const text = this.chatInput.value;
    //   this.apiService
    //     .postMessage(this.selectedChannel, this.selectedUser, text)
    //     .subscribe({
    //       next: ({ data }) => {
    //         if (data?.MessagePost) {
    //           this.messages = [data.MessagePost, ...this.messages];
    //         }
    //       },
    //       error: () => {
    //         const msg: MessageEntry = {
    //           datetime: new Date(),
    //           messageId: `${new Date().getTime()}`,
    //           text: text,
    //           userId: this.selectedUser,
    //           error: true,
    //         };
    //         this.messages = [msg, ...this.messages];
    //       },
    //     });
    //   this.chatInput.patchValue('');
    // }
  }
}
