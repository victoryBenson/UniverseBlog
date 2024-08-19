export interface CreateBlogProps {
    _id?: string;
    title?: string;
    content?: string;
    author?: string;
    label?: string;
    readTime?: string;
    img?: null | File
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    imagePrev?: string;
  }

// export type NewBlog = Omit<CreateBlogProps, "_id" | "createdAt" | "updatedAt">;


export interface BlogProps {
  _id: string;
  title: string;
  content: string;
  author: string;
  label: string;
  readTime: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}