import { Component, Output, Input } from '@angular/core';

// TODO use a model or something else.
interface iconModel{
  name: ['chat', 'expand_less']
}

@Component({
  selector: 'app-button-chat',
  standalone: false,
  templateUrl: './button-chat.component.html',
  styleUrls: ['./button-chat.component.scss']
})
export class ButtonChatComponent {
  @Input() icon = 'chat';
  changeIcon(): void{
    if(this.icon=='chat'){
      this.icon = 'expand_less'
    }else{
      this.icon = 'chat'
    }
    // Open the chat dialog
    
  }

}
