import axios from "axios";

async function checkCompany(name: string): Promise<boolean> {
  let params = new URLSearchParams();
  params.append("query", name);
  params.append("type", "Keyword");

  let response = await axios.post(`https://bdnaash.com/search`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      Cookie: "v4bdnaash_session=mo7ko5t2ph8rlg8cbi3o01bvke2tuqnr;",
    },
  });

  return response?.data?.data?.is_pro_israel === "1";
}

async function getSuggetions(name: string): Promise<string[]> {
  let params = new URLSearchParams();
  params.append("query", name);
  let response = await axios
    .post(`https://bdnaash.com/home/searchSuggestions`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-requested-with": "XMLHttpRequest",
      },
    })
    .catch((e) => e.response);
  return response?.data?.data?.map((d: any) => d.title) || [];
}

export default {
  checkCompany,
  getSuggetions,
};

export { checkCompany, getSuggetions };
