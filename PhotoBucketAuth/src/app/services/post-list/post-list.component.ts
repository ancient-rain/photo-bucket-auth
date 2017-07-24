import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth.service";
import { PostService } from "../post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  constructor(private authService: AuthService,
  public postService: PostService) { }

  ngOnInit() {
  }

  get numColumns(): number {
    if (window.innerWidth < 950) {
      return 2;
    } else if (window.innerWidth < 1300) {
      return 3;
    } else {
      return 4;
    }
  }
}
