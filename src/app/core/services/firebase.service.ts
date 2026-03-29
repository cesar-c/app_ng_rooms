import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  private app = getApps().length ? getApp() : initializeApp(environment.firebase);

  readonly auth = getAuth(this.app);
  readonly firestore = getFirestore(this.app);
  readonly rtdb = getDatabase(this.app);
}
