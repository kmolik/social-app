export interface Post {
  _id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  image?: any;
  creator?: {
    name: string;
  }
  createdAt?: Date;
}
