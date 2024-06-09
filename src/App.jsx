import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const getInputList = async (word) => {
    try {
      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${word}`
      );
      console.log(result);
      setSearchResult(result.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (searchWord) {
      getInputList(searchWord);
    }
    // getInputList();
  }, [searchWord]);

  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a Book</h1>
      <input
        type="text"
        value={searchWord}
        onChange={(event) => {
          setSearchWord(event.target.value);
          console.log(event.target.value);
        }}
      />
      {searchResult.length > 0 && (
        <>
          {searchResult.map((result, index) => {
            return (
              <div key={index} className="autocompleteItems">
                <ul>
                  <li className="search-result">{result.volumeInfo.title}</li>
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default App;
