import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: this.path
})
export class ContactService {
  private path = 'contacts/'

  constructor(
    private db: AngularFireDatabase
  ) { }

  getAll() {
    return this.db.list(this.path, ref => ref.orderByChild('name'))
    .snapshotChanges()
    .pipe(map(c => {
      return c.map(x => ({key: x.payload.key, ...x.payload.val()}));
    }))
  }

  get(key: string) {
    return this.db.object(this.path + key).snapshotChanges()
    .pipe(map(c=> {
      return {key: c.key, ...c.payload.val()};
    }))
  }

  save(contact: any) {
    return new Promise((resolve, reject) => {
      if(contact.key) {
        this.db.list(this.path)
        .update(contact.key, {name: contact.name, tel: contact.tel})
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        this.db.list(this.path)
        .push({name: contact.name, tel: contact.tel})
        .then(() => resolve());
      }
    })
  }

  remove(key: string) {
    return this.db.list(this.path).remove(key);
  }
}
