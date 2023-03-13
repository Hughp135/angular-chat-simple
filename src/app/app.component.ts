import { Component } from '@angular/core';
import { ChannelId, UserId } from 'src/generated/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedChannel: ChannelId = ChannelId.General;
  selectedUser: UserId = UserId.Joyse;
  availableChannels = [ChannelId.General, ChannelId.Lgtm, ChannelId.Technology];
  availableUsers = [UserId.Joyse, UserId.Russell, UserId.Sam];

  onUserChanged(value: string) {
    this.selectedUser = UserId[value as UserId];
  }

  onChannelChanged(channel: ChannelId) {
    this.selectedChannel = channel;
  }
}
