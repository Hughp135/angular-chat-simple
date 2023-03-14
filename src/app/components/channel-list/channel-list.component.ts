import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChannelId, UserId } from 'src/generated/graphql';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent {
  availableChannels: ChannelId[];
  availableUsers: UserId[];
  selectedChannel: Observable<ChannelId>;
  selectedUser: Observable<UserId>;

  constructor(public readonly channelsService: ChannelsService) {
    this.availableChannels = channelsService.availableChannels;
    this.availableUsers = channelsService.availableUsers;
    this.selectedChannel = channelsService.selectedChannel;
    this.selectedUser = channelsService.selectedUser;
  }
}
