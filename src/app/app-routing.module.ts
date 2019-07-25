import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { SettingsComponent } from './settings/settings.component';
import { TestCaseEditorComponent } from './test-case-editor/test-case-editor.component';
import { TestTimeComponent } from './test-time/test-time.component';
import { MonitorComponent } from './monitor/monitor.component';


const routes: Routes = [
  { path: '', redirectTo: '/monitor', pathMatch: 'full' },
  { path: 'test-time', component: TestTimeComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'editor', component: TestCaseEditorComponent },
  { path: 'nlu', component: RasaNluComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
