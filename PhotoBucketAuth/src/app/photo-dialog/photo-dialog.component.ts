import { Component, OnInit } from '@angular/core';
import { Photo } from "../models/photo.model";
import { MdDialogRef } from "@angular/material";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {

  formPhoto: Photo;
  userUid: string;

  constructor(private dialogRef: MdDialogRef<PhotoDialogComponent>,
  private afAuth: AngularFireAuth) { 
    this.formPhoto = new Photo();
    this.userUid = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.formPhoto.uid = this.userUid;
    this.dialogRef.close(); 
  }
}
