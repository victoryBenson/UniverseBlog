

export interface BlogProps {
    _id: string;
    title: string;
    content: string;
    author: string;
    label: string;
    readTime: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }


  export interface FormInitialState {
    author:string,
    tittle:string,
    content:string,
    readTime:string,
    label:string,
    image: null | File
}

