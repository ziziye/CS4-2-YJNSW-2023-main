import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { Button } from "nsw-ds-react";
import cms from "../../api-clients/cms";
import { SearchContext } from "../../contexts/Search";

function SearchInput() {
  const firstUpdate = useRef(true);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const dispatch = useContext(SearchContext)[1];

  const fetchRoles = useCallback(async () => {
    try {
      const res = await cms.getAllRoles();
      if (res.error && res.error.status === 404) {
        return;
      }
      setAllRoles(res);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      fetchRoles();
      firstUpdate.current = false;
    }
  }, [fetchRoles]);

  const yourFilterFunction = (text) => {
    const regex = new RegExp(text, "i");
    return allRoles.data.filter((role) => regex.test(role.attributes.roleName));
  };

  const handleSearchTextChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);

    const suggestions = yourFilterFunction(newText);
    setSuggestions(suggestions);
  };

  const handleSearchSubmit = () => {
    dispatch({ type: "CLICK_SEARCH_BUTTON", payload: searchText });
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchText(suggestion.attributes.roleName);
    // 清空建议
    setSuggestions([]);
  };

  return (
    <div className="nsw-m-top-lg">
      <div className="nsw-form__input-group">
        <label className="sr-only" htmlFor="search-input">
          Search
        </label>
        <input
          className="nsw-form__input"
          type="search"
          id="search-input"
          name="search-input"
          value={searchText}
          onChange={handleSearchTextChange}
          data-cy="search-input"
        />
        <Button
          className="nsw-button nsw-button--dark nsw-button--flex"
          type="button"
          onClick={handleSearchSubmit}
          data-cy="search-submit"
        >
          Search
        </Button>
      </div>
      {searchText !== "" && suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.attributes.roleName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
