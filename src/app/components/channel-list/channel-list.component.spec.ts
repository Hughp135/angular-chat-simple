import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelsService } from 'src/app/services/channels.service';
import { ChannelId } from 'src/generated/graphql';
import { ChannelListComponent } from './channel-list.component';

describe('ChannelListComponent', () => {
  let component: ChannelListComponent;
  let fixture: ComponentFixture<ChannelListComponent>;
  let channelsService: ChannelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChannelListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChannelListComponent);
    component = fixture.componentInstance;
    channelsService = TestBed.inject<ChannelsService>(ChannelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display channels list', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const listItems = nativeElement.querySelectorAll('li');

    expect(listItems.length).toEqual(
      component.channelsService.availableChannels.length
    );

    listItems.forEach((listItem, index) => {
      const label = listItem.querySelector('span');
      expect(label).toBeDefined();
      expect(label?.innerText).toEqual(
        `${component.channelsService.availableChannels[index]} Channel`
      );
    });
  });
  it('selected channel should have the active class', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const listItems = nativeElement.querySelectorAll('li');

    expect(listItems[0]).toHaveClass('active-channel');
  });
  it('selecting a channel should apply the active class', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const listItems = nativeElement.querySelectorAll('li');

    listItems[1].click();

    fixture.detectChanges();

    expect(listItems[0]).not.toHaveClass('active-channel');
    expect(listItems[1]).toHaveClass('active-channel');
  });
  it('selecting a channel should call the changeChannel method', () => {
    const nativeElement: HTMLElement = fixture.nativeElement;
    const listItems = nativeElement.querySelectorAll('li');

    const spy = spyOn(channelsService, 'changeChannel');

    listItems[2].click();

    expect(spy).toHaveBeenCalledWith(ChannelId.Technology);
  });
});
