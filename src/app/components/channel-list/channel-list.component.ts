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
  constructor(public readonly channelsService: ChannelsService) {}
}
