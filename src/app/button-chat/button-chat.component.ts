import { Component, Output, Input } from '@angular/core';

// TODO: use a model or something else. (OCP) principle.
interface iconModel{
  name: ['chat', 'expand_less']
}

// Button respects (SRP) principle
@Component({
  selector: 'app-button-chat',
  standalone: false,
  templateUrl: './button-chat.component.html',
  styleUrls: ['./button-chat.component.scss']
})
export class ButtonChatComponent {
  /**
   * Changes the icon of the button, which in turn renders the chat.
   */
  @Input() icon = 'chat';
  changeIcon(): void{
    if(this.icon=='chat'){
      this.icon = 'expand_less'
    }else{
      this.icon = 'chat'
    }
  }
  // Create onClick funtion that renders the chat-template component.
}
