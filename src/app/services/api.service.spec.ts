import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
} from 'apollo-angular/testing';
import { ChannelId, Queries } from 'src/generated/graphql';
import { ApiService, GET_LATEST_MESSAGES } from './api.service';
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
    service.fetchLatest().subscribe((result) => {
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
});