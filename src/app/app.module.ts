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

import { TestCaseComponent } from './test-case/test-case.component';
import { TestTimeComponent } from './test-time/test-time.component';

import { PromptComponent } from './prompt/prompt.component';

import { RasaNluIntentComponent } from './rasa-nlu-intent/rasa-nlu-intent.component';
import { RasaNluEntitiesComponent } from './rasa-nlu-entities/rasa-nlu-entities.component';
import { RasaNluIntentRankComponent } from './rasa-nlu-intent-rank/rasa-nlu-intent-rank.component';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { RasaNluEntityComponent } from './rasa-nlu-entity/rasa-nlu-entity.component';
import { WakewordComponent } from './wakeword/wakeword.component';
import { ResponseComponent } from './response/response.component';
import { RasaNluResponseComponent } from './rasa-nlu-response/rasa-nlu-response.component';
import { TestCaseEditorComponent } from './test-case-editor/test-case-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TestComponent,
    SettingsComponent,
    RasaNluIntentComponent,
    RasaNluEntitiesComponent,
    RasaNluIntentRankComponent,
    RasaNluComponent,
    RasaNluEntityComponent,
    TestCaseComponent,
    PromptComponent,
    TestTimeComponent,
    WakewordComponent,
    ResponseComponent,
    RasaNluResponseComponent,
    TestCaseEditorComponent
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
