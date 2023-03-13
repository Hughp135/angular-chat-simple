import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { filter, map } from 'rxjs';
import {
  Queries,
  QueriesMessagesFetchLatestArgs,
  ChannelId,
  MessageEnum,
  QueriesFetchMoreMessagesArgs,
  Mutations,
  MutationsMessagePostArgs,
  UserId,
} from 'src/generated/graphql';

export const GET_LATEST_MESSAGES = gql<Queries, QueriesMessagesFetchLatestArgs>`
  query GetLatestMessages($channelId: ChannelId!) {
    MessagesFetchLatest(channelId: $channelId) {
      datetime
      messageId
      text
      userId
    }
  }
`;

export const GET_MORE_MESSAGES = gql<Queries, QueriesFetchMoreMessagesArgs>`
  query GetMoreMessages(
    $channelId: ChannelId!
    $messageId: String!
    $old: Boolean!
  ) {
    MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
      datetime
      messageId
      text
      userId
    }
  }
`;

export const POST_MESSAGE = gql<Mutations, MutationsMessagePostArgs>`
  mutation PostMessage(
    $channelId: ChannelId!
    $userId: UserId!
    $text: String!
  ) {
    MessagePost(channelId: $channelId, text: $text, userId: $userId) {
      datetime
      messageId
      text
      userId
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  fetchMore(channelId: ChannelId, messageId: string, old: boolean) {
    return this.apollo
      .watchQuery({
        fetchPolicy: 'no-cache',
        query: GET_MORE_MESSAGES,
        variables: { channelId, messageId, old },
      })
      .valueChanges.pipe(
        filter((result) => !!result?.data?.MessagesFetchMore),
        map((result) => result.data.MessagesFetchMore as MessageEnum[])
      );
  }

  fetchLatest(channelId: ChannelId) {
    return this.apollo
      .watchQuery({
        query: GET_LATEST_MESSAGES,
        variables: { channelId },
      })
      .valueChanges.pipe(
        filter((result) => !!result?.data?.MessagesFetchLatest),
        map((result) => result.data.MessagesFetchLatest as MessageEnum[])
      );
  }

  postMessage(channelId: ChannelId, userId: UserId, text: string) {
    return this.apollo.mutate({
      mutation: POST_MESSAGE,
      variables: { channelId, userId, text },
    });
  }
}
