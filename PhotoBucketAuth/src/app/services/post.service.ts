import { Injectable } from '@angular/core';
import { Photo, PhotoWithAuthor } from "../models/photo.model";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import { AuthorService } from "./author.service";
import { User } from "../models/user";

@Injectable()
export class PostService {
  readonly photosPath = 'photos';
  readonly usersPath = 'users';

  private _photosStream: FirebaseListObservable<Photo[]>;
  photosWithUserStream: Observable<PhotoWithAuthor[]>;

  constructor(private db: AngularFireDatabase,
  private authorService: AuthorService) {
    this._photosStream = this.db.list(this.photosPath);
    this.photosWithUserStream = Observable.combineLatest<PhotoWithAuthor[]>(
      this._photosStream,
      this.authorService.userMapStream,
      (photos: Photo[], photoMap: Map<string, User>) => {
        const photosWithAuthor: PhotoWithAuthor[] = [];
        for (const photo of photos) {
          const photoWithAuthor = new PhotoWithAuthor(photo);
          photoWithAuthor.user.userUid = photo.uid;
          photosWithAuthor.push(photoWithAuthor);
        }
        return photosWithAuthor;
      });
  }

  add(photo: Photo): void {
    this._photosStream.push(photo);
  }
}
