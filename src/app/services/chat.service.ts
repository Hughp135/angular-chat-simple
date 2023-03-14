import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import {
  MessageEnum,
  Queries,
  QueriesMessagesFetchLatestArgs,
} from 'src/generated/graphql';
import { ApiService } from './api.service';
import { ChannelsService } from './channels.service';

type MessageEntry = MessageEnum & { error?: boolean };

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _messages = new BehaviorSubject<MessageEntry[]>([]);
  public readonly messages = this._messages.asObservable();

  private fetchLatestQueryRef: QueryRef<
    Pick<Queries, 'MessagesFetchLatest'>,
    QueriesMessagesFetchLatestArgs
  >;

  constructor(
    private readonly apiService: ApiService,
    private readonly channelsService: ChannelsService
  ) {
    this.fetchLatestQueryRef = this.apiService.latestQuery();

    channelsService.selectedChannel.subscribe((channelId) => {
      // When channel changes, fetch the latest messages
      this.fetchLatestQueryRef.refetch({
        channelId,
      });
    });

    this.fetchLatestQueryRef.valueChanges.subscribe(
      ({ data, loading }): void => {
        if (loading) {
          return;
        }
        this._messages.next(data.MessagesFetchLatest || []);
      }
    );
  }

  fetchMore(old: boolean) {
    const messages = this._messages.getValue();
    const realMessages = messages.filter((message) => !message.error);

    // Get the first or last message id (depending on 'old')
    const messageId = realMessages[old ? realMessages.length - 1 : 0];

    this.apiService
      .fetchMore(this.channelsService.currentChannel, messageId.messageId, old)
      .subscribe({
        next: (data) => {
          if (data.length) {
            const newMessages = old
              ? [...messages, ...data]
              : [...[...data].reverse(), ...messages]; // data is reversed as it comes in the wrong order from API
            this._messages.next(newMessages);
          }
        },
        error: (e) => {
          console.error(e);
        },
      });
  }

  postMessage(text: string) {
    const messageData: MessageEntry = {
      datetime: new Date().toISOString(),
      messageId: `${Date.now()}`,
      text,
      userId: this.channelsService.currentUser,
    };
    this.apiService
      .postMessage(
        this.channelsService.currentChannel,
        this.channelsService.currentUser,
        text
      )
      .subscribe({
        next: () => {
          console.log('fetching more');
          this.fetchMore(false);
        },
        error: () => {
          const failedMessage: MessageEntry = {
            ...messageData,
            error: true,
          };

          this._messages.next([failedMessage, ...this._messages.getValue()]);
        },
      });
  }
}
