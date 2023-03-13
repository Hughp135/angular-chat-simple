import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ChannelId, Mutations, Queries, UserId } from 'src/generated/graphql';
import {
  ApiService,
  GET_LATEST_MESSAGES,
  GET_MORE_MESSAGES,
  POST_MESSAGE,
} from './api.service';
import { ExecutionResult } from 'graphql';

describe('ApiService', () => {
  let service: ApiService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    service = TestBed.inject(ApiService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch latest messages', () => {
    service.fetchLatest(ChannelId.General).subscribe((result) => {
      expect(result).toEqual([]);
    });

    const op = controller.expectOne(GET_LATEST_MESSAGES);
    expect(op.operation.variables['channelId']).toEqual(ChannelId.General);

    op.flush({
      data: {
        MessagesFetchLatest: [],
      },
    } as ExecutionResult<{ MessagesFetchLatest: Queries['MessagesFetchLatest'] }>);
  });

  it('should fetch more messages', () => {
    service.fetchMore(ChannelId.General, 'asd', true).subscribe((result) => {
      expect(result).toEqual([]);
    });

    const op = controller.expectOne(GET_MORE_MESSAGES);
    expect(op.operation.variables['channelId']).toEqual(ChannelId.General);
    expect(op.operation.variables['messageId']).toEqual('asd');

    op.flush({
      data: {
        MessagesFetchMore: [],
      },
    } as ExecutionResult<{ MessagesFetchMore: Queries['MessagesFetchMore'] }>);
  });

  it('should post a message', () => {
    service
      .postMessage(ChannelId.General, UserId.Joyse, 'asd')
      .subscribe(({ data }) => {
        expect(data?.MessagePost).toEqual(null);
      });

    const op = controller.expectOne(POST_MESSAGE);
    expect(op.operation.variables['channelId']).toEqual(ChannelId.General);
    expect(op.operation.variables['userId']).toEqual(UserId.Joyse);
    expect(op.operation.variables['text']).toEqual('asd');

    op.flush({
      data: {
        MessagePost: null,
      },
    } as ExecutionResult<{ MessagePost: Mutations['MessagePost'] }>);
  });
});
