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
import { AuthorService } from "./author.service";

@Injectable()
export class AuthService {
  isSignedInStream: Observable<boolean>;
  displayName: Observable<string>;
  formPhoto: Photo;
  userPath: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFireDatabase,
    private dialog: MdDialog,
    private authorService: AuthorService) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userPath = `/users/${user.uid}`;
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
        this.authorService.updateUser(user.uid, user.uid);
      });

  }

  signInWithRosefire(): void {
    Rosefire.signIn(environment.rosefireRegistryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      this.authorService.updateUser(rfUser.username, rfUser.username);
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
    this.dialog.open(PhotoDialogComponent);
  }
}
