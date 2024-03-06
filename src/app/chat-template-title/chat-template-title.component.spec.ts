import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTemplateTitleComponent } from './chat-template-title.component';

describe('ChatTemplateTitleComponent', () => {
  let component: ChatTemplateTitleComponent;
  let fixture: ComponentFixture<ChatTemplateTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTemplateTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTemplateTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
