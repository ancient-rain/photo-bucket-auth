import { Component, OnInit, Inject } from '@angular/core';
import { Photo } from "../models/photo.model";
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { PostService } from "../services/post.service";

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
  private afAuth: AngularFireAuth,
  private postService: PostService) { 
    this.formPhoto = new Photo();
    this.userUid = this.afAuth.auth.currentUser.uid;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    try {
      this.formPhoto.uid = this.userUid;
      this.postService.add(this.formPhoto);
      this.dialogRef.close();
    } catch (e) {
      console.error('Submit error: ', e);
    }
  }
}
