import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { ChatGptService } from './chat-gpt.service';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from './models/message.model';
import { ErrorResponse } from './models/chat-response.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userMessage = '';
  conversation: Message[] = [
    { role: 'system', content: 'As an adept customer support assistant chat bot, you are capable of answering basic questions that users may have about a certain company and about it\'s website. The company is called Hamilton Medical and it is in charge of producing medical ventilators. It has a website, which is: https://www.hamilton-medical.com/' }
  ];

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  constructor(private chatGptService: ChatGptService) {}

  sendMessage(event: Event, message: string): void {
    event.preventDefault();
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
          this.scrollToBottom();
        }),
        catchError((error) => this.handleError(error))
      )
      .subscribe();
  }

  handleEnterKey(event: Event): void {
    event.preventDefault();
    this.sendMessage(event, this.userMessage);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    }, 0);
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
    this.scrollToBottom();
    return of(null);
  }


  // openChatWindow(): void {
  //   const dialogRef = this.dialog.open(ChatWindowComponent, {
  //     width: '300px', // adjust the width and height as per your requirement
  //     height: '400px',
  //     position: { top: '20px', right: '20px' } // position the chat window in the corner
  //   });
  // }
}
