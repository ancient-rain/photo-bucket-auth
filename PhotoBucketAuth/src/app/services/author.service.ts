import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";

@Injectable()
export class AuthorService {
  readonly usersPath = 'users';

  userMapStream: FirebaseObjectObservable<Map<string, User>>;

  constructor(private db: AngularFireDatabase) { 
    this.userMapStream = this.db.object(this.usersPath);
  }

  updateUser(userKey: string, userUid: string): void {
    const user = new User({
      userUid: userUid,
    });

    this.db.object(`/${this.usersPath}/${userKey}`).set(user);
  }
}
