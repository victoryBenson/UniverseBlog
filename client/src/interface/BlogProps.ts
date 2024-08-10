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
    imagePrev: string;
  }


  
export type NewBlog = Omit<BlogProps, "_id" | "createdAt" | "updatedAt">;