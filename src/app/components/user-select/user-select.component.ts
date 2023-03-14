import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChannelsService } from 'src/app/services/channels.service';
import { UserId } from 'src/generated/graphql';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss'],
})
export class UserSelectComponent {
  userSelect: FormControl<UserId | null>;

  constructor(readonly channelsService: ChannelsService) {
    this.userSelect = new FormControl(null);

    channelsService.selectedUser.subscribe((value) => {
      if (value !== this.userSelect.value) {
        this.userSelect.setValue(value);
      }
    });

    this.userSelect.valueChanges.subscribe((value) => {
      if (value) {
        channelsService.changeUser(value);
      }
    });
  }
}
