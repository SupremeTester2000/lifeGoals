import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Initialize Firebase
initializeApp(environment.firebase);
getFirestore();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
