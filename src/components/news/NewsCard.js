import React from "react";
import "./News.css";

const NewsCard = (props) => {
  const date = props.article.date.split("T")[0];
  return (
    <>
      <div className="article_card_container">
        <div className="news_card_header">
          <div className="news_card_title">{props.article.title}</div>
          <div className="news_card_date">{date}</div>
        </div>
        <div className="news_card_body">
          <a href={props.article.article} className="news_card_link" target="_blank">
            <div className="news_card_image">
              <img src={props.article.image} alt="Link Preview" className="news_card_img"/>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default NewsCard;
