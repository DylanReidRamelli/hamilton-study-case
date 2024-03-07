import { Component } from '@angular/core';
import { ChatGptService } from '../chat-gpt.service';
import { ErrorResponse } from '../models/chat-response.model';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message.model';
import {  Messages } from '../welcome';


// Define the Chat-Bot personality through a string.
const CHAT_BOT_PERSONALITY= 'As an adept customer support assistant chat-bot, you are capable of answering basic questions that users may have about the company Hamilton-Medical. The company is in charge of producing medical ventilators and other kinds of laboratory equipment. You should not answer questions that are not related to Hamilton. If the input is in another language then you should respond in that language as well.'


@Component({
  selector:'app-chat-template',
  templateUrl: './chat-template-title.component.html',
  styleUrls:['./chat-template-title.component.scss'],
})
export class ChatTemplateTitleComponent {
  userMessage = '';

  // Converstation with ChatGPT model.
  conversation: Message[] = [
    { role: 'system', content: CHAT_BOT_PERSONALITY}
  ];

  // Inject ChatGptService into ChatTemplateComponent
  constructor(private chatGptService: ChatGptService){}

  // TODO: See if future need backend to store the messages. For security and privacy reasons I don't know.
  // Array that stores messages between bot and user. Mostly for NebularUI. Can Definetly be done in another way.
  messages = Messages;


  /**
   * Event triggered on send of message in form.
   * @param event variable stores message and file
   */
  getMessage(event:any) {
    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      user: {
        name: '',
        avatar:''
      },
      size: 'small',
    });
    // Trigger also the messageSend to ChatGptApi.
    this.sendMessage(event.message);
  }


  /**
   * Trim message. Append to conversation array as user and then call chat function, which returns an Observable.
   * Similar to promises but supports multiple objects returning.
   * @param message is a string that contains the user's prompt.
   * @returns 
   */
  sendMessage(message: string): void {
    if (!message.trim()) return;

    this.conversation.push({ role: 'user', content: message });
    this.userMessage = '';

    this.chatGptService
      .chat(this.conversation)
      .pipe(
        // Only the first emitted value from the Observable is processed.
        take(1),
        // Access the response.
        tap(response => {
          const assistantMessage = response.choices[0].message.content;
          // Add response to conversation array.
          this.conversation.push({ role: 'assistant', content: assistantMessage });
          // Add response to UI.
          this.messages.push({text: assistantMessage, date: new Date(), reply: false,user: {
            name: 'Bot',
            avatar: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png',
          }, size: 'small'})
        }),
        // If error catch error.
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }


  /**
   * Handles the error if the API call coudln't go through by emitting an error to the conversation array.
   * @param error The error that was cought
   * @returns An Observable of unkown type.
   */
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
