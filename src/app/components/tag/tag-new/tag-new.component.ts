import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../interfaces/tag.interface';


@Component({
  selector: 'app-tag-new',
  templateUrl: './tag-new.component.html',
  styleUrls: ['./tag-new.component.css']
})
export class TagNewComponent implements OnInit {
  creating: boolean = false;
  @Output() tag = new EventEmitter<Tag>();

  constructor(private tagService: TagService) { }

  ngOnInit() {
  }

  onNewTag(){
    this.creating = !this.creating;
  }

  onCancel(){
    this.creating = !this.creating;
  }

  onCreate(name: string, color: string){
    this.tagService.createTag(name, color).subscribe((tag: Tag) => {
      this.tag.emit(tag);
      this.creating = !this.creating;
    });
  }

}
