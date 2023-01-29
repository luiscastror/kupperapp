import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private firestore: AngularFirestore) {}

  public cart: any = [];

  // Get collection one time
  public get_collection(collection: string): Observable<any> {
    return this.firestore.collection(collection).get() as Observable<any>;
  }

  // Get collection real time
  public get_collection_realtime(collection: string): Observable<any> {
    return this.firestore
      .collection(collection)
      .snapshotChanges()
      .pipe(
        map((actions: any) =>
          actions.map((a: any) => {
            const data = a.payload.doc.data();
            data.uid = a.payload.doc.id;
            return data;
          })
        )
      ) as Observable<any>;
  }
}
