import React from "react";
import { Row, Col, Card, Icon, CardTitle } from "react-materialize";

export interface NYTArticleData {
  abstract: string;
  date: string;
  id: string;
  imageUrl: string;
  url: string;
  title: string;
}

interface ArticleContent {
  content: NYTArticleData[] | undefined;
}

export const Articles = ({ content }: ArticleContent) => {
  return (
    <Row>
      {content &&
        content.map((article) => (
          <Col l={3} m={6} s={12}>
            <Card
              actions={[
                <a
                  href={article.url}
                  key={`a-${article.id}`}
                  target={"_blank"}
                  rel="noopener noreferrer"
                >
                  OPEN ARTICLE IN NEW PAGE
                </a>,
              ]}
              closeIcon={<Icon>close</Icon>}
              header={
                <CardTitle
                  image={article.imageUrl}
                  key={`cardtitle-${article.id}`}
                >
                  {article.title}
                </CardTitle>
              }
              key={`card-${article.id}`}
            >
              {article.abstract}
              <h6 key={`h6-${article.id}`}>Published {article.date}</h6>
            </Card>
          </Col>
        ))}
    </Row>
  );
};
