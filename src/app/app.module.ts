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

import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { TestCaseComponent } from './test-case/test-case.component';
import { TestTimeComponent } from './test-time/test-time.component';

import { PromptComponent } from './prompt/prompt.component';

import { RasaNluIntentComponent } from './rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntitiesComponent } from './rasa-nlu-entities/rasa-nlu-entities.component';
import { RasaNluIntentRankComponent } from './rasa-nlu-intent-rank/rasa-nlu-intent-rank.component';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { RasaNluEntityComponent } from './rasa-nlu-entity/rasa-nlu-entity.component';
import { RasaCoreComponent } from './rasa-core/rasa-core.component';
import { WakewordComponent } from './wakeword/wakeword.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestComponent,
    SettingsComponent,
    BotComponent,
    RasaNluIntentComponent,
    RasaNluEntitiesComponent,
    RasaNluIntentRankComponent,
    RasaNluComponent,
    RasaNluEntityComponent,
    RasaCoreComponent,
    TestDialogComponent,
    TestCaseComponent,
    PromptComponent,
    TestTimeComponent,
    WakewordComponent
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

  constructor() {}
}
