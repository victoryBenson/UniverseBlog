

export interface BlogProps {
    _id: string;
    title: string;
    content: string;
    author: string;
    label: string;
    readTime: string;
    image?: string | File | null;
    createdAt: string;
    updatedAt: string;
    imagePrev: string;
  }


//new blog prop
export type NewBlog = Omit<BlogProps, "_id" | "createdAt" | "updatedAt">;