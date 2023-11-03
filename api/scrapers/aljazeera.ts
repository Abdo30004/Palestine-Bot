import fs from "fs/promises";
import axios from "axios";
import { load } from "cheerio";
function unescapeHTML(html: string) {
  return load(html).text();
}
let checkForWordInsideObject = (obj: any, word: string): boolean => {
  let found = false;
  for (let key in obj) {
    if (typeof obj[key] === "object") {
      found = checkForWordInsideObject(obj[key], word) as boolean;
      if (found) break;
    } else if (typeof obj[key] === "string") {
      if (obj[key].toLowerCase().includes(word)) {
        found = true;
        break;
      }
    }
  }
  return found;
};

let scraper = async (q: number, o: number) => {
  let url = `https://www.aljazeera.com/graphql?wp-site=aja&operationName=ArchipelagoAjeSectionPostsQuery&variables={"category":"palestine","categoryType":"where","postTypes":["post","video"],"quantity":${q},"offset":${o}}&extensions={}`;

  let response = await axios
    .get(encodeURI(url), {
      headers: {
        Referer: "https://www.aljazeera.com/where/palestine/",
        authority: "www.aljazeera.com",
        "Original-Domain": "www.aljazeera.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.76",
        "Wp-Site": "aja",
      },
    })
    .catch((e) => e.response);

  let { data } = response;
  let articles = data.data.articles;
};
