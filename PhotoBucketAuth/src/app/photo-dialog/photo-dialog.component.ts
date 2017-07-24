import { Component, OnInit, Inject } from '@angular/core';
import { Photo } from "../models/photo.model";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

interface PhotoDialogData {
  photosPath: string;
  usersPath: string;
  photo?: Photo;
}

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  formPhoto: Photo;
  userUid: string;

  constructor(private dialogRef: MdDialogRef<PhotoDialogComponent>,
  @Inject(MD_DIALOG_DATA) private dialogData: PhotoDialogData,
  private afAuth: AngularFireAuth) { 
    this.formPhoto = new Photo();
    this.userUid = this.afAuth.auth.currentUser.uid;
    console.log('recieved the data', this.dialogData);
  }

  ngOnInit() {
  }

  onSubmit(): void {
    try {
      const userRef = firebase.database().ref(this.dialogData.usersPath);
      const photoRef = firebase.database().ref(this.dialogData.photosPath);

      console.log(this.dialogData.usersPath);

      if (this.dialogData.usersPath) {
        userRef.push(this.userUid);
      }

      this.formPhoto.uid = this.userUid;
      photoRef.push(this.formPhoto);

      this.dialogRef.close();
    } catch (e) {
      console.error('Submit error: ', e);
    }
  }
}
