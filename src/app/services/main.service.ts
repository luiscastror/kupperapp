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
  public cart: any = [];

  constructor(private firestore: AngularFirestore) {
    const carLocal = localStorage.getItem('cartKupper') || '[]';
    this.cart = JSON.parse(carLocal);
    console.log(this.cart);
  }

  public addCart(item: any) {
    const pos = this.cart.findIndex((x: any) => x.uid == item.uid);
    if (pos == -1) {
      this.cart.push(item);
    } else {
      this.cart[pos] = item;
    }
    this.saveCart();
  }

  public removeCart(item: any) {
    const pos = this.cart.findIndex((x: any) => x.uid == item.uid);
    this.cart.splice(pos, 1);
    this.saveCart();
  }

  saveCart() {
    console.log(this.cart);
    localStorage.setItem('cartKupper', JSON.stringify(this.cart));
  }

  public get_collection(collection: string): Observable<any> {
    return this.firestore.collection(collection).get() as Observable<any>;
  }

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
