import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topics-page',
  templateUrl: './topics-page.component.html',
  styleUrls: ['./topics-page.component.css']
})
export class TopicsPageComponent implements OnInit {
  tag: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
