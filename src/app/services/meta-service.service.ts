import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {

  constructor(private firestore: AngularFirestore) { }

  getMetas(): Observable<Meta[]> {
    return this.firestore.collection<Meta>('metas', ref => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Meta;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  addMeta(meta: string): Observable<any> {
    const metaObj = {
      meta: meta,
      createdAt: new Date()
    };
    return new Observable(subscriber => {
      this.firestore.collection('metas').add(metaObj)
        .then(docRef => {
          subscriber.next(docRef.id);
          subscriber.complete();
        })
        .catch(err => subscriber.error(err));
    });
  }

  deleteMeta(id: string): Observable<void> {
    return new Observable(subscriber => {
      this.firestore.collection('metas').doc(id).delete()
        .then(() => {
          subscriber.next();
          subscriber.complete();
        })
        .catch(err => subscriber.error(err));
    });
  }
}
