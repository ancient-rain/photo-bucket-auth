import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class AuthorService {
  readonly usersPath = 'users';

  constructor(private db: AngularFireDatabase) { }

  updateUser(userKey: string, userUid: string): void {
    const user = new User({
      userUid: userUid,
    });

    this.db.object(`/${this.usersPath}/${userKey}`).set(user);
  }
}
