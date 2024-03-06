import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';

// TODO use a model or something else.
interface iconModel{
  name: ['chat', 'expand_less']
}

@Component({
  selector: 'app-button-chat',
  standalone: true,
  imports:[MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './button-chat.component.html',
  styleUrls: ['./button-chat.component.scss']
})
export class ButtonChatComponent {
  icon = 'chat';
  changeIcon(): void{
    if(this.icon=='chat'){
      this.icon = 'expand_less'
    }else{
      this.icon = 'chat'
    }
    // Open the chat dialog
    
  }

}
