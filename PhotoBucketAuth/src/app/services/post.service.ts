import { Injectable } from '@angular/core';
import { Photo } from "../models/photo.model";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class PostService {
  readonly photosPath = 'photos';
  readonly usersPath = 'users';

  private _photosStream: FirebaseListObservable<Photo[]>;

  constructor(private db: AngularFireDatabase) { 
    this._photosStream = this.db.list(this.photosPath);
  }

  get photosStream(): FirebaseListObservable<Photo[]> {
    return this._photosStream;
  }

  add(photo: Photo): void {
    console.log('pushing the photo', photo);
    this._photosStream.push(photo);
  }
}
