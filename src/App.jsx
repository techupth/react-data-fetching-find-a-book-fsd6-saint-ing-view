import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [bookName, setBookName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      fetchBooks(searchQuery);
    }
  }, [searchQuery]);

  const handleChangeBookName = (e) => {
    setBookName(e.target.value);
  };

  const handleSubmitBookName = (e) => {
    e.preventDefault();
    setSearchQuery(bookName);
    setBookName("");
  };

  const fetchBooks = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setSearchResults(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data from Google Books API", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Find a Book</h1>
      <form onSubmit={handleSubmitBookName}>
        <label htmlFor="searchbook">
          <input
            id="searchbook"
            type="text"
            name="searchbook"
            value={bookName}
            onChange={handleChangeBookName}
          />
        </label>
        {/* <button type="submit">Search</button> */}
      </form>

      <div>
        <h3>Search Results</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {searchResults.map((book, index) => (
              <li key={index}>{book.volumeInfo.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
