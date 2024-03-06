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
}
