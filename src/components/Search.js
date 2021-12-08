const Search = ({handleSearch, search}) => {

  const handleSearchType = (e) => {
    handleSearch(e.target.value);
  }
 
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-input"
        id="search"
        value={search}
        placeholder="Search for an item..."
        onChange={handleSearchType}
      />
    </div>
  );
}

export default Search;
