import { TestBed } from '@angular/core/testing';
import { ChannelId, UserId } from 'src/generated/graphql';

import { ChannelsService } from './channels.service';

describe('ChannelsService', () => {
  let service: ChannelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('availableUsers should have correct user list', () => {
    expect(service.availableUsers).toEqual([
      UserId.Joyse,
      UserId.Russell,
      UserId.Sam,
    ]);
  });
  it('availableChannels should have correct channel list', () => {
    expect(service.availableChannels).toEqual([
      ChannelId.General,
      ChannelId.Lgtm,
      ChannelId.Technology,
    ]);
  });
  it('selectedChannel observable should have the correct initial value', (done) => {
    service.selectedChannel.subscribe((value) => {
      expect(value).toEqual(ChannelId.General);
      done();
    });
  });
  it('selectedUser observable should have the correct initial value', (done) => {
    service.selectedUser.subscribe((value) => {
      expect(value).toEqual(UserId.Joyse);
      done();
    });
  });
  it('currentUser should have the correct initial value', () => {
    expect(service.currentUser).toEqual(UserId.Joyse);
  });
  it('currentChannel should have the correct initial value', () => {
    expect(service.currentChannel).toEqual(ChannelId.General);
  });
  it('changeUser method should emit the correct value', (done) => {
    service.changeUser(UserId.Russell);
    expect(service.currentUser).toEqual(UserId.Russell);
    service.selectedUser.subscribe((value) => {
      expect(value).toEqual(UserId.Russell);
      done();
    });
  });
  it('changeChannel method should emit the correct value', (done) => {
    service.changeChannel(ChannelId.Lgtm);
    expect(service.currentChannel).toEqual(ChannelId.Lgtm);
    service.selectedChannel.subscribe((value) => {
      expect(value).toEqual(ChannelId.Lgtm);
      done();
    });
  });
  it('selectedUser observable should only emit once if changed to the same user', () => {
    let changedCount = 0;

    service.changeUser(UserId.Russell);

    service.selectedUser.subscribe((value) => {
      ++changedCount;
      expect(value).toEqual(UserId.Russell);
    });

    service.changeUser(UserId.Russell);

    expect(changedCount).toEqual(1);
  });
  it('selectedChannel observable should only emit once if changed to the same channel', () => {
    let changedCount = 0;

    service.changeChannel(ChannelId.Technology);

    service.selectedChannel.subscribe((value) => {
      ++changedCount;
      expect(value).toEqual(ChannelId.Technology);
    });

    service.changeChannel(ChannelId.Technology);

    expect(changedCount).toEqual(1);
  });
});
