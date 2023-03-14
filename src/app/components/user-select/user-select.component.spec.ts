import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ChannelsService } from 'src/app/services/channels.service';
import { UserId } from 'src/generated/graphql';

import { UserSelectComponent } from './user-select.component';

describe('UserSelectComponent', () => {
  let component: UserSelectComponent;
  let fixture: ComponentFixture<UserSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSelectComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the correct option selected', () => {
    expect(component.userSelect.value).toEqual(UserId.Joyse);
  });
  it('when value changes, changeUser should be called', () => {
    component.userSelect.setValue(UserId.Russell);
    expect(component.userSelect.value).toEqual(UserId.Russell);
    expect(component.channelsService.currentUser).toEqual(UserId.Russell);
  });
  it('when changeUser is called, the select should update', () => {
    component.channelsService.changeUser(UserId.Sam);
    expect(component.userSelect.value).toEqual(UserId.Sam);
  });
  it('changeUser should not be called if value is null', () => {
    component.userSelect.setValue(null);
    expect(component.channelsService.currentUser).toEqual(UserId.Joyse);
  });
});
