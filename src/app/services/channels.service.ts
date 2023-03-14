import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { ChannelId, UserId } from 'src/generated/graphql';

@Injectable({ providedIn: 'root' })
export class ChannelsService {
  private readonly _selectedChannel = new BehaviorSubject<ChannelId>(
    ChannelId.General
  );
  private readonly _selectedUser = new BehaviorSubject<UserId>(UserId.Joyse);

  public readonly availableChannels = [
    ChannelId.General,
    ChannelId.Lgtm,
    ChannelId.Technology,
  ];
  public readonly availableUsers = [UserId.Joyse, UserId.Russell, UserId.Sam];

  public readonly selectedChannel = this._selectedChannel
    .asObservable()
    .pipe(distinctUntilChanged());
  public readonly selectedUser = this._selectedUser
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor() {}

  get currentChannel() {
    return this._selectedChannel.getValue();
  }

  get currentUser() {
    return this._selectedUser.getValue();
  }

  changeChannel(channelId: ChannelId) {
    this._selectedChannel.next(channelId);
  }

  changeUser(userId: UserId) {
    this._selectedUser.next(userId);
  }
}
