import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { RasaNluComponent } from './rasa-nlu/rasa-nlu.component';
import { SettingsComponent } from './settings/settings.component';
import { TestCaseEditorComponent } from './test-case-editor/test-case-editor.component';
import { TestTimeComponent } from './test-time/test-time.component';


const routes: Routes = [
  { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'test-time', component: TestTimeComponent },
  { path: 'test-case-editor', component: TestCaseEditorComponent },
  { path: 'rasa-nlu', component: RasaNluComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
