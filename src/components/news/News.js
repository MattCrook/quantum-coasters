import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import CustomizedInputBaseLight from "../search/CustomizedSearchLight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import newsManager from "../../modules/news/newsManager";
import NewsCard from "./NewsCard";
import "./News.css";

const News = (props) => {
  const { logout, clearStorage, loading } = useAuth0();
  const { authUser } = props;
  const { userProfile } = props;
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState([]);
  const [sectionContent, setSectionContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [initialState, setInitialState] = useState([]);

  const handleSortByDropdown = (e) => {
    if (isOpen === false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleShowSection = (e) => {
    const state = e.target.id;
    setSection(state);
    handleShowSectionContent(state);
  };

  const handleShowSectionContent = async (section) => {
    setIsLoading(true);
    const newsContent = await newsManager.getSectionContent(section);
    setSectionContent(newsContent);
    setIsLoading(false);
  };

  const sortArticleDate = (content) => {
    const sortedContent = content.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    return sortedContent;
  };

  const searchNewsHandler = (e) => {
    let inputStateToChange = { ...searchInput };
    inputStateToChange = e.target.value;
    setSearchInput(inputStateToChange);
    filterSearchList(inputStateToChange);
  };

  function filterSearchList(inputValue) {
    const filteredResults = sectionContent.filter((article) => {
      return article.title.toLowerCase().includes(inputValue.toLowerCase());
    });
    setSectionContent(filteredResults);
    return filteredResults;
  }

  const handleSortByMostRecent = async (e, sortKeyWord, section) => {
    setIsLoading(true);
    if (sortKeyWord === "recent") {
      const newsContent = await newsManager.getSectionContent(section);
      setSectionContent(newsContent);
      sortArticleDate(newsContent);
    } else if (sortKeyWord === "oldest") {
      const newsContent = await newsManager.getSectionContent(section);
      setSectionContent(newsContent);
      const sortedContent = sortArticleDate(newsContent);
      sortedContent.reverse();
    } else if (sortKeyWord === "none") {
      handleShowSectionContent("all");
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  useEffect(() => {
    isLoading(true);
    async function getUserArticlesForInitialState() {
      const userArticles = await newsManager.fetchAllUserArticles();
      setInitialState(userArticles);
      setSectionContent(userArticles);
      };
      getUserArticlesForInitialState();
      setIsLoading(false);
  }, [isLoading]);

  return (
    <>
      <nav id="nav-container" className="navbar is-dark">
        <div className="leaderboard_container_1">
          <button id="quantum_logo_leaderboard" className="navbar-item" onClick={() => props.history.push("/home")}>
            Quantum Coasters
          </button>
        </div>

        <div className="leaderboard_container_2">
          <div className="leaderboard-name">
            <p className="leaderboard-first-and-last-name-in-nav">
              {authUser.first_name} {authUser.last_name}
            </p>
            {!loading && userProfile.image ? (
              <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
            ) : (
              <img id="google-profile-pic" src={defaultQPicture} alt="My Avatar" />
            )}

            <button
              onClick={() => logout({ returnTo: window.location.origin }, clearStorage())}
              className="logout-navbar-item"
              data-testid="logout-btn-testid"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="news_title_header">Quantum Coasters News</div>
      <div id="news_container">
        <div className="sort_by_dropdown_container">
          <div className="sort_by_dropdown_box" onClick={handleSortByDropdown}>
            <div className="dropdown_title" onClick={handleSortByDropdown}>
              Sort By
            </div>
            <ArrowDropDownIcon onClick={handleSortByDropdown} />
          </div>
          {isOpen ? (
            <div className="dropdown_options_container">
              <div className="most_recent" onClick={(e) => handleSortByMostRecent(e, "none", "all")}>
                None
              </div>
              <div className="most_recent" onClick={(e) => handleSortByMostRecent(e, "recent", "all")}>
                Most Recent
              </div>
              <div className="oldest" onClick={(e) => handleSortByMostRecent(e, "oldest", "all")}>
                Oldest
              </div>
            </div>
          ) : null}
        </div>
        <div id="all" className="news_subHeader" onClick={handleShowSection}>
          All
        </div>
        <div id="recent" className="news_subHeader" onClick={handleShowSection}>
          Recent News
        </div>
        <div id="insights" className="news_subHeader" onClick={handleShowSection}>
          Insights
        </div>
        <div id="corporate" className="news_subHeader" onClick={handleShowSection}>
          Corporate News
        </div>
        <div id="user_articles" className="news_subHeader" onClick={handleShowSection}>
          User Written Articles
        </div>
        <CustomizedInputBaseLight searchNewsHandler={searchNewsHandler} {...props} />
      </div>
      <div id="news_content_container">
        {sectionContent.map((article) => (
          <NewsCard key={article.id} article={article} section={section} {...props} />
        ))}
      </div>
    </>
  );
};

export default News;
