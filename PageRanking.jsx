import React, { useState } from 'react';
import axios from 'axios';

const PageRanking = () => {
  const [searchWord, setSearchWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [invertedIndexData, setInvertedIndexData] = useState([]);

  const handleSearch = () => {
    if (!searchWord.trim()) {
      alert('Please enter word to search');
      return; // Exit the function early if search word is empty
    }
    // Encode the search word before passing it to the API call
    const encodedSearchWord = encodeURIComponent(searchWord);
    
    // Hit the page ranking backend API with the encoded search word
    axios.get(`http://localhost:9091/mobile-plans/pageranking?keyword=${encodedSearchWord}`)
      .then(response => {
        setSearchResults(response.data.map(result => ({
          ...result,
          webPageName: formatURL(result.webPageName),
        })));
      })
      .catch(error => {
        console.error('Error fetching page ranking:', error);
      });

    // Hit the inverted index backend API with the search word
    axios.get(`http://localhost:9091/mobile-plans/invertedIndex/${encodedSearchWord}`)
      .then(response => {
        setInvertedIndexData(response.data);
      })
      .catch(error => {
        console.error('Error fetching inverted index:', error);
      });
  };

  const formatURL = (url) => {
    // Replace "https___" with an empty string, remove ".txt" extension, and add a forward slash after ".ca"
    let newURL = url.replace(/^https___/, '').replace(/\.txt$/, '').replace(/\.ca/, '.ca/').replace(/\/com/,'/com/');
    return newURL.replace(/\/_/g ,'/');
  };

  return (
    <div className="text-white flex flex-col items-center justify-center mt-10">
      <div className="flex gap-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" // Ensure text color is visible
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={handleSearch}
        >
          Send
        </button>
      </div>
      
      {/* Display Page Ranking Results */}
      <div className="mt-4">
        {searchResults.length > 0 && (
          <ul className="list-disc list-inside">
            {searchResults.map(({ webPageName, score }) => (
              <li key={webPageName} className="bg-white shadow-md rounded-lg p-4 text-l m-2 hover:animate-pulse transition duration-300">
                <a
                  href={`https://${webPageName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {webPageName}
                </a>
                <span className="bg-blue-800 text-white rounded-full px-2 ml-2 ">{score}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Inverted Indexing Results */}
      <div className="mt-4">
        
        {invertedIndexData.length > 0 && (
          
          <div className="bg-white shadow-md rounded-lg p-4 text-l m-6 text-blue-600">
            <h2 className="text-2xl font-bold mb-2">Inverted Indexing Results</h2>
            <pre>{JSON.stringify(invertedIndexData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageRanking;
