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

function pharseArticle(article: any, lang: "ar" | "en"): Article {
  let prefix = lang === "en" ? "aje" : "aja";
  let baseUrl = `https://www.aljazeera.${lang === "ar" ? "net" : "com"}`;

  let enLogo =
    "https://scontent.falg6-1.fna.fbcdn.net/v/t39.30808-1/305816850_10161001009408690_771136011521720849_n.jpg?stp=dst-jpg_p200x200&_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=gw-l4tSXSVEAX-1TQHV&_nc_ht=scontent.falg6-1.fna&oh=00_AfA5kTutJl95y9bczU_pAGTmH7CrB3AWAxJYQIKR87JJjw&oe=654AA133";
  let arLogo =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3eJ2pAs2dyd3GqsbWOmLFkho6ITObHXcK3lfzq-MSZVTf-4-ePS4Wm9TgXIcJaW-wkfU&usqp=CAU";
  return {
    id: `aljazeera-${lang}-${article.id}`,
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
    source: {
      name: "aljazeera-" + lang,
      logo: lang === "ar" ? arLogo : enLogo,
      language: lang,
    },
    date: new Date(article.date),
  };
}

let scraper = async (q: number, o: number, lang?: "ar" | "en") => {
  let baseUrl = `https://www.aljazeera.${lang === "ar" ? "net" : "com"}`;

  let prefix = lang === "en" ? "aje" : "aja";
  let url = `${baseUrl}/graphql?wp-site=${prefix}&operationName=ArchipelagoAjeSectionPostsQuery&variables={"category":"palestine","categoryType":"where","postTypes":["post","video"],"quantity":${q},"offset":${o}}&extensions={}`;
  let response = await axios
    .get(encodeURI(url), {
      headers: {
        Referer: `${baseUrl}/where/palestine/`,
        authority: `${baseUrl.replace("https://", "")}}`,
        "Original-Domain": `${baseUrl.replace("https://", "")}}`,
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

async function getAljazeeraNews(
  n: number,
  lang?: "ar" | "en",
  search?: string
) {
  let q = Math.min(n, 100);
  let offsets = splitN(n);
  let articles = await Promise.all(offsets.map((o) => scraper(q, o, lang)));
  let news = articles
    .flat()
    .map((a) => pharseArticle(a, lang || "en"))
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
