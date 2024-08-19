import React, { useState } from "react";
import axios from "axios";
import plansData from "../constants/Plans.json";
import plane from "../assets/plane.json";
import Lottie from "lottie-react";
import bell from "../assets/bell.png";
import rogers from "../assets/rogers.png";
import freedom from "../assets/freedom.png";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [spellingSuggestions, setSpellingSuggestions] = useState([]);
  const [wordCompletions, setWordCompletions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");

  const handleSearchQueryChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setError("");

    // Call the word completion API for word completions
    axios
      .get(`http://localhost:9091/mobile-plans/wordcompletion/${value}`)
      .then((response) => {
        const completion = response.data["Last Word"];
        setWordCompletions([completion]);
      })
      .catch((error) => {
        console.error("Error fetching word completion:", error);
        setWordCompletions([]);
      });

    // Reset spelling suggestions when the user types
    setSpellingSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      setError("Please enter text to search 😬");
      return;
    }
    setError("");

    setWordCompletions([]);

    axios
      .get(`http://localhost:9091/mobile-plans/spellCheck/${searchQuery}`)
      .then((response) => {
        if (response.data.length === 0) {
          setError("No matching words in our dictionary 🥹 Try another word!!");
          setShowSuggestions(false);
          setSearchResults([]);
        } else {
          const suggestions = response.data;
          setSpellingSuggestions(suggestions);
          setShowSuggestions(true);
        }
      })
      .catch((error) => {
        setError("Invalid word format 🤥");
        console.error("Error fetching spelling suggestions:", error);
        setSpellingSuggestions([]);
        setShowSuggestions(false);
      });

    //Filter
    /*
    const filteredResults = plansData.filter(plan => {
      const queryLowerCase = searchQuery.toLowerCase();
      return (
        plan.provider.toLowerCase().includes(queryLowerCase) ||
      plan.planName.toLowerCase().includes(queryLowerCase) ||
      plan.planData.toLowerCase().includes(queryLowerCase) ||
      plan.monthlyCost.toLowerCase().includes(queryLowerCase) ||
      plan.dataAllowance.toLowerCase().includes(queryLowerCase) ||
      plan.networkCoverage.toLowerCase().includes(queryLowerCase) ||
      plan.callAndTextAllowance.toLowerCase().includes(queryLowerCase)
      );
    });

    console.log('Filtered Results:', filteredResults); // Log filtered results

    setSearchResults(filteredResults);
    */
    const filteredResults = plansData.reduce((accumulator, plan) => {
      const queryLowerCase = searchQuery.toLowerCase();
      const matchedProps = {
        provider: plan.provider,
        planName: plan.planName,
        planData: plan.planData,
        monthlyCost: plan.monthlyCost,
        dataAllowance: plan.dataAllowance,
        networkCoverage: plan.networkCoverage,
        callAndTextAllowance: plan.callAndTextAllowance,
      };

      Object.keys(matchedProps).forEach((prop) => {
        if (matchedProps[prop].toLowerCase().includes(queryLowerCase)) {
          accumulator.push(matchedProps);
        }
      });

      return accumulator;
    }, []);

    setSearchResults(filteredResults);
  };

  //Web page
  return (
    <div className="flex flex-col items-center justify-center h-full mb-10">
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "-15rem" }}>
        {" "}
        {/* Reduced margin top */}
        <Lottie animationData={plane} />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-white">
        Want to know more about Mobile Plans?
      </h1>
      <div className="relative flex items-center mt-4">
        <input
          type="text"
          className="border border-gray-300 rounded-l-md px-4 py-3 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl mr-4"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-r-md text-xl"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {showSuggestions && (
        <div className="flex flex-col justify-center mt-4 gap-4 text-center">
          <h3 className="text-gray-500 text-lg font-bold mb-2">
            Did you mean?
          </h3>
          <div className="flex flex-wrap justify-center">
            {spellingSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-gray-300 rounded-md p-2 mr-2">
                {suggestion}
              </div>
            ))}
          </div>
        </div>
      )}
      {wordCompletions.length > 0 && (
        <div className="flex flex-wrap justify-center mt-4 gap-4">
          {wordCompletions.map((wordCompletion, index) => (
            <div
              key={index}
              className="bg-gray-300 rounded-md p-2 text-center mx-1"
            >
              {wordCompletion}
            </div>
          ))}
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="m-14">
          <h3 className="text-white text-2xl font-bold mb-4 relative">
            Search Results:
          </h3>
          <div className="grid grid-cols-3 gap-8">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-md border-4 border-blue-300 shadow-md p-3 mb-3 max-w-md relative"
              >
                {/* Render icon based on provider */}
                {result.provider === "Bell" && (
                  <img
                    src={bell}
                    alt="Bell"
                    className="absolute top-2 right-8 w-1/6 h-1/6"
                  />
                )}
                {result.provider === "Rogers" && (
                  <img
                    src={rogers}
                    alt="Rogers"
                    className="absolute top-6 right-6 w-1/4 h-12"
                  />
                )}
                {result.provider === "Freedom" && (
                  <img
                    src={freedom}
                    alt="Freedom"
                    className="absolute top-2 right-4 w-1/5 h-1/5"
                  />
                )}

                {/* Render other details */}
                {Object.entries(result).map(([key, value]) => (
                  <p
                    key={key}
                    className="text-gray-700 text-xl font-semibold  m-6"
                  >
                    {key}:    {value}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
