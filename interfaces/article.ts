


interface Article {
  id: string;
  title: string;
  description: string | null;
  link: string;

  image: {
    url: string | null;
    caption: string | null;
  };
  date: Date;
}



export { Article };