import fs from "fs/promises";
import axios from "axios";
import { load } from "cheerio";
import { Article } from "../../interfaces/article";

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
    id: `aljazeera-{article.id}`,
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
    source: "aljazeera",
    date: new Date(article.date),
  };
}

let scraper = async (q: number, o: number, lang?: string) => {
  let prefix = lang === "en" ? "aje" : "aja";
  let url = `https://www.aljazeera.net/graphql?wp-site=${prefix}&operationName=ArchipelagoAjeSectionPostsQuery&variables={"category":"palestine","categoryType":"where","postTypes":["post","video"],"quantity":${q},"offset":${o}}&extensions={}`;
  let response = await axios
    .get(encodeURI(url), {
      headers: {
        Referer: "https://www.aljazeera.net/where/palestine/",
        authority: "www.aljazeera.net",
        "Original-Domain": "www.aljazeera.net",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76",
        "Wp-Site": `${prefix}`,
      },
    })
    .catch((e) => e.response);

  let { data } = response;
  let articles = data?.data?.articles || [];

  return articles;
};

async function getAljazeeraNews(n: number, lang?: string, search?: string) {
  let q = Math.min(n, 100);
  let offsets = splitN(n);
  let articles = await Promise.all(offsets.map((o) => scraper(q, o, lang)));
  let news = articles
    .flat()
    .map(pharseArticle)
    .filter((a) =>
      search
        ? a.title.includes(search) ||
          a.description?.includes(search) ||
          a.image.caption?.includes(search)
        : true
    );
  return news;
}
export default getAljazeeraNews;
export { getAljazeeraNews };
