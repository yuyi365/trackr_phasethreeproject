const Search = ({handleSearch, search}) => {

  const handleSearchType = (e) => {
    handleSearch(e.target.value);
  }
 
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Items</label>
      <input
        type="text"
        id="search"
        value={search}
        placeholder="Type a item to search..."
        onChange={handleSearchType}
      />
    </div>
  );
}

export default Search;
