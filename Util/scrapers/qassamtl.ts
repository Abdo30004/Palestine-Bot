import client from "../../index";
import { Article } from "../../interfaces/article";

async function getQassamNews(n: number, search?: string): Promise<Article[]> {
  let messages = await client.tlClient
    ?.getMessages("qassambrigades", {
      limit: n,
      search,
    })
    .catch((err) => null);

  if (!messages) return [];

  let articles: Article[] = messages.map((message) => {
    return {
      id: `qassambrigades-${message.id}`,
      title: "رسالة من قناة كتائب القسام",
      link: `https://t.me/qassambrigades/${message.id}`,
      description: message.text,
      image: {
        url: "https://upload.wikimedia.org/wikipedia/ar/5/53/Alqassam.jpg",
        caption: "كتائب القسام",
      },
      source: "qassambrigades",
      date: new Date(message.date * 1000),
    };
  });

  return articles;
}

export default getQassamNews;
export { getQassamNews };
