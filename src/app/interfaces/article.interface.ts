import { Tag } from './tag.interface';
import { CoverImage } from './cover-image.interface';

export interface Article {
  id: number;
  title: string;
  description: string;
  published: boolean;
  content: any;
  readTime: number;
  userId: number;
  coverImage: CoverImage;
  tags: Array<Tag>;
  createdAt: string;
  updatedAt: string;
}
