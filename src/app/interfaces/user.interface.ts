import { ProfileImage } from './profile-image.interface';
import { Role } from './role.interface';

export interface User{
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: ProfileImage;
  roles: Array<Role>;
  createdAt: string;
  updatedAt: string;
}
