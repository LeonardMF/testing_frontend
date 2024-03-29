import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { SettingsComponent } from './settings/settings.component';
import { EditorComponent } from './editor/editor.component';
import { TestTimeComponent } from './test-time/test-time.component';
import { MonitorComponent } from './monitor/monitor.component';
import { ReviewComponent } from './review/review.component';


const routes: Routes = [
  { path: '', redirectTo: '/monitor', pathMatch: 'full' },
  { path: 'test-time', component: TestTimeComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'editor', component: EditorComponent },
  { path: 'review', component: ReviewComponent },
  { path: 'nlu', component: RasaNluComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
