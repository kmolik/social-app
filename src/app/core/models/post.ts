export interface Post {
  _id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  creator?: {
    name: string;
  }
  createdAt?: Date;
}
