import Axios from "axios";
import { formatWithMoment } from "./moment";
import { NYTArticleData } from "../Components/Articles";

const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
  apiKey = "&api-key=9BA8645eRu8Ktgid65zqBjNkGVy5WzAP",
  query = "q=",
  filterQueryOpen = `&fq=section_name:("`,
  filterQueryClose = `")`;
export const sections = [
  "home",
  "arts",
  "automobiles",
  "books",
  "business",
  "fashion",
  "food",
  "health",
  "insider",
  "magazine",
  "movies",
  "obituaries",
  "opinion",
  "politics",
  "realestate",
  "science",
  "sports",
  "sundayreview",
  "technology",
  "theater",
  "t - magazine",
  "travel",
  "upshot",
  "us",
  "world",
];

interface RawArticleData {
  _id: string;
  abstract: string;
  headline: {
    main: string;
    [propName: string]: any;
  };
  multimedia: {
    url: string;
    [propName: string]: any;
  }[];
  pub_date: string;
  web_url: string;
  [propName: string]: any;
}

export const searchNYT = async (
  keywordsToSearch: string,
  sectionToSearch: string
) => {
  try {
    const searchQuery =
      queryURL +
      query +
      keywordsToSearch +
      filterQueryOpen +
      sectionToSearch +
      filterQueryClose +
      apiKey;
    let response = await Axios.get(searchQuery);
    console.log(response);
    let articleData: RawArticleData[] = await response.data.response.docs;
    let resultsCount = await response.data.response.meta.hits;
    let cleanArticleData: NYTArticleData[] = articleData.map((doc) => ({
      abstract: doc.abstract,
      date: formatWithMoment(doc.pub_date).toString(),
      id: doc._id,
      imageUrl: doc.multimedia.length
        ? "https://static01.nyt.com/" + doc.multimedia[0].url
        : "https://bauhaus100aspen.org/wp-content/uploads/2019/06/defaultPromoCrop.png",
      url: doc.web_url,
      title: doc.headline.main,
    }));
    return { data: cleanArticleData, hits: resultsCount };
  } catch (error) {
    alert(`Error returned during NYT API call - ${error}`);
  }
};
