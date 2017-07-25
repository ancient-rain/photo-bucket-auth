import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../post.service";
import { Photo, PhotoWithAuthor } from "../../models/photo.model";

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PostComponent implements OnInit {
  @Input() photoWithAuthor: PhotoWithAuthor;

  constructor(public postService: PostService) { }

  ngOnInit() {
  }

}
