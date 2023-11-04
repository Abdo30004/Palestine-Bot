interface Article {
  id: string;
  title: string;
  description: string | null;
  link: string;

  image: {
    url: string | null;
    caption: string | null;
  };
  source: {
    name: string;
    logo: string;
    language: "ar" | "en";
  };
  date: Date;
}

export { Article };
