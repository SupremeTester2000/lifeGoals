import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, DocumentData, QueryConstraint } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meta } from '../models/meta.model';

@Injectable({
  providedIn: 'root'
})
export class MetaServiceService {
  private metasCollection = collection(this.firestore, 'metas');

  constructor(private firestore: Firestore) { }

  getMetas(): Observable<Meta[]> {
    return from(
      getDocs(this.metasCollection).then(snapshot => {
        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Meta));
      })
    );
  }

  addMeta(meta: string): Observable<string> {
    return from(
      addDoc(this.metasCollection, {
        meta: meta,
        createdAt: new Date()
      }).then(docRef => docRef.id)
    );
  }

  deleteMeta(id: string): Observable<void> {
    const metaDoc = doc(this.firestore, 'metas', id);
    return from(deleteDoc(metaDoc));
  }
}
