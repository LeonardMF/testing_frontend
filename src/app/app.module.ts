import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { SettingsComponent } from './settings/settings.component';
import { BotComponent } from './bot/bot.component';
import { BotService, ActionService } from 'speech-angular';
import { NluComponent } from './nlu/nlu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestComponent,
    SettingsComponent,
    BotComponent,
    NluComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    const botServiceConfig = BotService.getConfig();
    botServiceConfig.errorOutputFlag = false;
    botServiceConfig.dialogLoadFlag = false;

    const actionServiceConfig = ActionService.getConfig();
    actionServiceConfig.errorOutputFlag = true;
}
}
