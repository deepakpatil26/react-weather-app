const Search = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="flex flex-col items-center gap-4 my-6 sm:flex-row sm:justify-center">
      <input
        type="text"
        className="border rounded px-4 py-2 w-72 sm:w-80 md:w-96"
        placeholder="Enter city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-green-500 text-white px-4 py-2 rounded w-32 sm:w-auto hover:bg-green-600"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
