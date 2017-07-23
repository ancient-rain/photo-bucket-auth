import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rosefire';
import { environment } from "../../environments/environment";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Photo } from "../models/photo.model";

@Injectable()
export class AuthService {
  isSignedInStream: Observable<boolean>;
  displayName: Observable<string>;
  photoStream: FirebaseListObservable<Photo[]>;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        // console.log('user signed in', user);
        this.photoStream = this.db.list(`photos`);
      } else {
        // console.log('user signed out');
      }
    });
    console.log(this.afAuth);
    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      });

    this.displayName = this.afAuth.authState
      .map<firebase.User, string>((user: firebase.User) => {
        if (user) {
          if (user.displayName) {
            return user.displayName;
          }
          return user.uid;
        }
        return '';
      });

  }

  signInWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result: any) => {
        this.router.navigate(['/']);
        const user: firebase.User = result.user;
        // this.authorService.updateAuthor(user.uid, user.displayName, user.photoURL);
      });

  }

  signInWithRosefire(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }

      this.afAuth.auth.signInWithCustomToken(rfUser.token).then((authState) => {
        this.router.navigate(['']);
      });
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
