import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { PostService } from "../services/post.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public authService: AuthService,
  public postService: PostService) { }

  ngOnInit() {
  }

}
