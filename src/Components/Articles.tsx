import React from "react";

export interface NYTArticleData {
  abstract: string;
  date: string;
  id: string;
  url: string;
  title: string;
}

interface ArticleContent {
  content: NYTArticleData[] | undefined;
}

export const Articles = ({ content }: ArticleContent) => {
  return (
    <div>
      <ul>
        {content &&
          content.map((article) => (
            <li key={article.id} style={{ listStyleType: "none" }}>
              <h3>{article.title}</h3>
              <h5>{article.date}</h5>
              <p>{article.abstract}</p>
              <a href={article.url} target={"_blank"} rel="noopener noreferrer">
                <i>Go to article</i>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
