export interface Post {
  _id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  image?: any;
  creator?: {
    _id?: number;
    name: string;
  }
  createdAt?: Date;
}
