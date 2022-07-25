import "../assets/SearchComponent.scss";

const SearchComponent = ({ onSearchFilter }: { onSearchFilter: (search: string) => void }) => {
  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Search"
        onChange={(event) => onSearchFilter(event.target.value)}
      />
    </div>
  );
};

export default SearchComponent;