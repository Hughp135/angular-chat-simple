import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ChannelListComponent } from './components/channel-list/channel-list.component';

@NgModule({
  declarations: [AppComponent, ChatWindowComponent, ChannelListComponent],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
