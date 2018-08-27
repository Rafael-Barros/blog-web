import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../services/tag.service';
import { Tag } from '../../../interfaces/tag.interface';

@Component({
  selector: 'app-tag-table',
  templateUrl: './tag-table.component.html',
  styleUrls: ['./tag-table.component.css']
})
export class TagTableComponent implements OnInit {
  tags: Tag[];
  editing: boolean = false;
  editingTagId: number;

  constructor(
    private tagService: TagService
  ) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void{
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags['content'];
    });
  }

  onEdit(tag: Tag): void{
    this.editing = true;
    this.editingTagId = tag.id;
  }

  onCancel(): void{
    this.editing = false;
  }

  onUpdate(name?: string, color?: string): void{
    this.tagService.updateTag(this.editingTagId, name, color).subscribe((tag: Tag) => {
      for(let i = 0; i < this.tags.length; i++){
        if(tag.id == this.tags[i].id){
          this.tags[i] = tag;
        }
      }
      this.editing = false;
    });
  }

  createTag(tag: Tag){
    this.tags.push(tag);
  }

  onDelete(id: number):void{
    this.tagService.deleteTag(id).subscribe((res: any) => {
      console.log(res);
      this.tags = this.tags.filter(t => t.id !== id);
    });
  }

}
