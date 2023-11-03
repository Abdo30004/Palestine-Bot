import fs from "fs/promises";
import axios from "axios";
import { load } from "cheerio";

interface Article {
  title: string;
  description: string;
  link: string;

  image: {
    url: string | null;
    caption: string | null;
  };
  date: Date;
}

function unescapeHTML(html: string) {
  return load(html).text();
}
function splitN(n: number): number[] {
  let arr = [];
  while (n > 0) {
    let q = Math.min(n, 100);
    let o: number = arr.length * 100;
    arr.push(o);
    n -= q;
  }

  return arr;
}

function pharseArticle(article: any): Article {
  let baseUrl = "https://www.aljazeera.net";
  return {
    title: unescapeHTML(article.title),
    description: unescapeHTML(article.excerpt),
    link: baseUrl + article.link,
    image: {
      url: baseUrl + article.featuredImage.sourceUrl,
      caption:
        unescapeHTML(article.featuredImage.caption) ||
        unescapeHTML(article.featuredImage.alt) ||
        null,
    },
    date: new Date(article.date),
  };
}

let scraper = async (q: number, o: number) => {
  let url = `https://www.aljazeera.net/graphql?wp-site=aja&operationName=ArchipelagoAjeSectionPostsQuery&variables={"category":"palestine","categoryType":"where","postTypes":["post","video"],"quantity":${q},"offset":${o}}&extensions={}`;

  let response = await axios
    .get(encodeURI(url), {
      headers: {
        Referer: "https://www.aljazeera.net/where/palestine/",
        authority: "www.aljazeera.net",
        "Original-Domain": "www.aljazeera.net",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76",
        "Wp-Site": "aja",
      },
    })
    .catch((e) => e.response);

  let { data } = response;
  let articles = data?.data?.articles || [];

  return articles;
};

async function getAljazeeraNews(n: number) {
  let q = Math.min(n, 100);
  let offsets = splitN(n);
  let articles = await Promise.all(offsets.map((o) => scraper(q, o)));
  let news = articles.flat();
  return news.map(pharseArticle);
}
export default getAljazeeraNews;
export { getAljazeeraNews };