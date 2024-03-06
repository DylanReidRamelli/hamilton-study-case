import { Component , ViewChild , ElementRef} from '@angular/core';
import { ChatGptService } from '../chat-gpt.service';
import { ErrorResponse } from '../models/chat-response.model';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';
// import { ChatShowcaseService } from './chat-showcase.service';

@Component({
  selector:'app-chat-template',
  templateUrl: './chat-template-title.component.html',
  styleUrls:['./chat-template-title.component.scss'],
})
export class ChatTemplateTitleComponent {

  userMessage = '';
  conversation: Message[] = [
    { role: 'system', content: 'As an adept customer support assistant chat bot, you are capable of answering basic questions that users may have about a certain company and about it\'s website. The company is called Hamilton Medical and it is in charge of producing medical ventilators. It has a website, which is: https://www.hamilton-medical.com/' }
  ];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatGptService: ChatGptService){}
  messages: any[] = [
    {
      text: 'As an adept customer support assistant chat bot, you are capable of answering basic questions that users may have about a certain company and about it\'s website. The company is called Hamilton Medical and it is in charge of producing medical ventilators. It has a website, which is: https://www.hamilton-medical.com/',
      date: new Date(),
      reply: false,
      user: {
        name: 'Bot',
        avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
      },
      size: 'small'
    },
  ];

  getMessage(event:any) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: 'John Doe',
        avatar: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
      },
      size: 'small',
    });

    console.log(event.message);

    this.sendMessage(event.message);

  }


  sendMessage(message: string): void {
    if (!message.trim()) return;

    this.conversation.push({ role: 'user', content: message });
    this.userMessage = '';

    this.chatGptService
      .chat(this.conversation)
      .pipe(
        take(1),
        tap(response => {
          const assistantMessage = response.choices[0].message.content;
          this.conversation.push({ role: 'assistant', content: assistantMessage });
          this.messages.push({text: assistantMessage, date: new Date(), reply: false,user: {
            name: 'Bot',
            avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
          }, size: 'small'})
        }),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }


  private handleError(error: ErrorResponse): Observable<unknown> {
    if (error.error && error.error.message) {
      let errorMessage = `Error: ${error.error.message}`;
      if (error.error.type) {
        errorMessage += ` (Type: ${error.error.type})`;
      }
      this.conversation.push({ role: 'error', content: errorMessage });
    } else {
      this.conversation.push({ role: 'error', content: 'An unknown error occurred.' });
    }
    return of(null);
  }
}
