import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rosefire';
import { environment } from "../../environments/environment";
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { Photo } from "../models/photo.model";
import { MdDialog, MdDialogConfig } from "@angular/material";
import { PhotoDialogComponent } from "../photo-dialog/photo-dialog.component";

@Injectable()
export class AuthService {
  isSignedInStream: Observable<boolean>;
  displayName: Observable<string>;
  photoStream: FirebaseListObservable<Photo[]>;
  formPhoto: Photo;
  userPath: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private dialog: MdDialog) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userPath = `/users/${user.uid}`;
        this.photoStream = this.db.list(`/photos`);
      } else {
        // console.log('user signed out');
      }
    });

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

    this.formPhoto = new Photo();
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

  showPhotoDialog(): void {
    console.log('TODO: show photo dialog');
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {usersPath: this.userPath, photosPath: `/photos`};
    this.dialog.open(PhotoDialogComponent, dialogConfig);
  }
}
