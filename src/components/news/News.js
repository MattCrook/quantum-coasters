import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import CustomizedInputBaseLight from "../search/CustomizedSearchLight";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import newsManager from "../../modules/news/newsManager";
import NewsCard from "./NewsCard";
import NavHeader from "../nav/NavHeader";
import "./News.css";

const News = (props) => {
  // const { logout, clearStorage, loading } = useAuth0();
  // const { authUser } = props;
  // const { userProfile } = props;
  // const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  // const quantum = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuMRtA9N0Xxc9D3adOG3x5piu_Ze4LdZVqA&usqp=CAU";
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState([]);
  const [sectionContent, setSectionContent] = useState([]);
  const [defaultSectionContent, setDefaultSectionContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [isSection, setIsSection] = useState(false);
  const [filterSection, setFilterSection] = useState();
  const [active, setActive] = useState(false);
  const [activeSection, setActiveSection] = useState(false);

  const handleSortByDropdown = (e) => {
    if (isOpen === false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleShowSection = (e) => {
    setIsSection(true);
    const state = e.target.id;
    setSection(state);
    handleShowSectionContent(state);
  };

  const handleShowSectionContent = async (section) => {
    setIsLoading(true);
    setActiveSection(section);
    const newsContent = await newsManager.getSectionContent(section);
    setSectionContent(newsContent);
    setDefaultSectionContent(newsContent);
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
    let target = e.target.id;
    setActive(target);
    console.log(sortKeyWord);
    if (sortKeyWord === "recent") {
      const newsContent = await newsManager.getSectionContent(section);
      const sortedContent = sortArticleDate(newsContent);
      console.log(sortedContent);
      sortedContent.reverse();
      setSectionContent(newsContent);
      setFilterSection("Recent");
    } else if (sortKeyWord === "oldest") {
      const newsContent = await newsManager.getSectionContent(section);
      sortArticleDate(newsContent);
      setSectionContent(newsContent);
      setFilterSection("Oldest");
    } else if (sortKeyWord === "none") {
      handleShowSectionContent(section);
      setFilterSection("Sort By");
    }
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <>
      <NavHeader {...props} />
      <div className="news_title_header">Quantum Coasters News</div>
      <div id="news_container">
        <div className="sort_by_dropdown_container">
          <div className="sort_by_dropdown_box" onClick={handleSortByDropdown}>
            {!filterSection ? (
              <div className="dropdown_title" onClick={handleSortByDropdown}>
                Sort By
              </div>
            ) : (
              <div className="dropdown_title" onClick={handleSortByDropdown}>
                {filterSection}
              </div>
            )}
            <ArrowDropDownIcon onClick={handleSortByDropdown} />
          </div>
          {isOpen ? (
            <div className="dropdown_options_container">
              {active === "none" ? (
                <div
                  id="none"
                  className="most_recent_active"
                  onClick={(e) => handleSortByMostRecent(e, "none", section)}
                >
                  None
                </div>
              ) : (
                <div id="none" className="most_recent" onClick={(e) => handleSortByMostRecent(e, "none", section)}>
                  None
                </div>
              )}
              {active === "most_recent" ? (
                <div
                  id="most_recent"
                  className="most_recent_active"
                  onClick={(e) => handleSortByMostRecent(e, "recent", section)}
                >
                  Most Recent
                </div>
              ) : (
                <div
                  id="most_recent"
                  className="most_recent"
                  onClick={(e) => handleSortByMostRecent(e, "recent", section)}
                >
                  Most Recent
                </div>
              )}
              {active === "oldest" ? (
                <div
                  id="oldest"
                  className="oldest_active"
                  onClick={(e) => handleSortByMostRecent(e, "oldest", section)}
                >
                  Oldest
                </div>
              ) : (
                <div id="oldest" className="oldest" onClick={(e) => handleSortByMostRecent(e, "oldest", section)}>
                  Oldest
                </div>
              )}
            </div>
          ) : null}
        </div>
        {activeSection === "all" ? (
          <div id="all" className="news_subHeader_active" onClick={handleShowSection}>
            All
          </div>
        ) : (
          <div id="all" className="news_subHeader" onClick={handleShowSection}>
            All
          </div>
        )}
        {activeSection === "recent" ? (
          <div id="recent" className="news_subHeader_active" onClick={handleShowSection}>
            Recent News
          </div>
        ) : (
          <div id="recent" className="news_subHeader" onClick={handleShowSection}>
            Recent News
          </div>
        )}
        {activeSection === "insights" ? (
          <div id="insights" className="news_subHeader_active" onClick={handleShowSection}>
            Insights
          </div>
        ) : (
          <div id="insights" className="news_subHeader" onClick={handleShowSection}>
            Insights
          </div>
        )}
        {activeSection === "corporate" ? (
          <div id="corporate" className="news_subHeader_active" onClick={handleShowSection}>
            Corporate News
          </div>
        ) : (
          <div id="corporate" className="news_subHeader" onClick={handleShowSection}>
            Corporate News
          </div>
        )}
        {activeSection === "user_articles" ? (
          <div id="user_articles" className="news_subHeader_active" onClick={handleShowSection}>
            User Written Articles
          </div>
        ) : (
          <div id="user_articles" className="news_subHeader" onClick={handleShowSection}>
            User Written Articles
          </div>
        )}
        <CustomizedInputBaseLight
          searchNewsHandler={searchNewsHandler}
          defaultSectionContent={defaultSectionContent}
          setSectionContent={setSectionContent}
          {...props}
        />
      </div>
      <div id="news_content_container">
        {isSection ? (
          sectionContent.map((article) => <NewsCard key={article.id} article={article} section={section} {...props} />)
        ) : (
          <>
            <div className="news_initial_container">
              {/* <img src={quantum} alt="Quantum" className="quantum_logo_pic"/> */}
              <div className="news_description">Catch up on all the latest news from around the country and world.</div>
              <div className="news_description">Or apply to become one of our blog contributors!</div>
              <div className="news_apply_user_article_btn_container">
                <button
                  className="news_apply_user_article_btn"
                  onClick={() => props.history.push("/news/contributor/apply")}
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="signature">
              <p>
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default News;
