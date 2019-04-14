import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TestComponent } from './test/test.component';
import { SettingsComponent } from './settings/settings.component';
import { BotComponent } from './bot/bot.component';
import { BotService, ActionService } from 'speech-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestComponent,
    SettingsComponent,
    BotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
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
