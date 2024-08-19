import React, { useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

const Crawler = () => {
  const [visitedUrls, setVisitedUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  const handleCrawl = () => {
    axios.get(`http://localhost:9091/mobile-plans/crawl?startingUrl=${searchQuery}`)
      .then(response => {
        const data = response.data;
        setVisitedUrls(data.visited_urls);
        setErrorMessage("");
      })
      .catch(error => {
        console.error('Error crawling website:', error);
        setVisitedUrls([]);
        setErrorMessage("Error crawling website!");
      });
  };

  return (
    <>
      <div className="text-white flex justify-center items-center m-8 text-3xl">
        Web Crawler
      </div>
      <div className="flex flex-row justify-center items-center gap-4 m-6">
        <SearchBar
          placeholder="Enter URL"
          value={searchQuery}
          onChange={handleSearchQueryChange} // Pass the function to handle search query change
        />
        <Button text="Crawl" style={{ width: '120px' }} onClick={handleCrawl} />
      </div>
      {visitedUrls.length > 0 && (
        <div className="m-10">
          <h3 className="text-white text-lg font-bold mb-4">Below are crawled websites:</h3>
          <div className="flex flex-col items-start">
            {visitedUrls.map((url, index) => (
              <div key={index} className="bg-white text-gray-800 rounded-md p-2 mb-2">
                {url}
              </div>
            ))}
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="mt-8">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
    </>
  );
};

export default Crawler;
