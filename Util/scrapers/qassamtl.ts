import client from "../../index";
import { Article } from "../../interfaces/article";

async function getQassamNews(
  n: number,
  lang: "ar" | "en",
  search?: string
): Promise<Article[]> {
  let channel = lang === "en" ? "qassambrigadeseng" : "qassambrigades";
  let messages = await client.tlClient
    ?.getMessages(channel, {
      limit: n,
      search,
    })
    .catch((err) => null);

  if (!messages) return [];

  let articles: Article[] | null = messages.map((message, i) => {
    return {
      id: `qassambrigades-${message.id}`,
      title:
        lang === "ar"
          ? "رسالة من قناة كتائب القسام"
          : "Message from Qassam Brigades",
      link: `https://t.me/${channel}/${message.id}`,
      description: message.text,
      image: {
        url: "https://upload.wikimedia.org/wikipedia/ar/5/53/Alqassam.jpg",
        caption: lang === "ar" ? "كتائب القسام" : "Qassam Brigades",
      },
      source: {
        name: "qassambrigades",
        logo: "https://upload.wikimedia.org/wikipedia/ar/5/53/Alqassam.jpg",
        language: lang,
      },
      date: new Date(message.date * 1000),
    };
  });

  if (!articles) return [];

  return articles;
}

export default getQassamNews;
export { getQassamNews };
