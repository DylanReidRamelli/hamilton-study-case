import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbButtonModule, NbChatModule, NbLayoutModule, NbSidebarModule, NbThemeModule } from '@nebular/theme';
import { ChatTemplateTitleComponent } from './chat-template-title/chat-template-title.component';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';


@NgModule({
  declarations: [
    AppComponent,
    ChatTemplateTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot(),
    MatIconModule,
    BrowserAnimationsModule,
    NbChatModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NbThemeModule.forRoot({ name: 'default' }),
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
