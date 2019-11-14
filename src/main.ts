import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { MicrosoftModule } from 'speech-angular';

import { MICROSOFT_REGION, MICROSOFT_SUBSCRIPTION_KEY } from './../credentials/microsoft-credentials-leo';

// Microsoft-Credentials
const microsoftOption = {
  microsoftDynamicCredentialsFlag: false,
  microsoftRegion: MICROSOFT_REGION,
  microsoftSubscriptionKey: MICROSOFT_SUBSCRIPTION_KEY,
  errorOutputFlag: false
};

// Initialisierung des Microsoft Cloud-Service
MicrosoftModule.init( microsoftOption, (aMicrosoftFlag: boolean) => {
  if ( microsoftOption && microsoftOption.errorOutputFlag ) {
      console.log( '===> Microsoft:', aMicrosoftFlag);
  }
  environment.microsoft = aMicrosoftFlag;
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
