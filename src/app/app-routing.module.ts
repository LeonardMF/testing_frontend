import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import { BotComponent } from './bot/bot.component';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { RasaCoreComponent } from './rasa-core/rasa-core.component';
import { SettingsComponent } from './settings/settings.component';
import { TestCaseComponent } from './test-case/test-case.component';
import { TestTimeComponent } from './test-time/test-time.component';


const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'test-time', component: TestTimeComponent },
  { path: 'test-dialog', component: TestDialogComponent },
  { path: 'test-case', component: TestCaseComponent },
  { path: 'bot', component: BotComponent },
  { path: 'rasa-nlu', component: RasaNluComponent },
  { path: 'rasa-core', component: RasaCoreComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
