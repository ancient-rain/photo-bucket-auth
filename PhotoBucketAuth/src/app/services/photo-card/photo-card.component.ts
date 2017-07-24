import { Component, OnInit, Input } from '@angular/core';
import { PostService } from "../post.service";
import { Photo } from "../../models/photo.model";

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PostComponent implements OnInit {
  @Input() photo: Photo;

  constructor(public postService: PostService) { }

  ngOnInit() {
  }

}
