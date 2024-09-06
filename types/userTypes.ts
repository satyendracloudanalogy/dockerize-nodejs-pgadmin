export interface User {
  email: string;
  name: string;
}

export interface Post {
  title: string;
  content: string;
  userId?: number;
}
