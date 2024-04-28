interface SearchBarProps {
    handleSearchSubmit: (search: string) => void;
}

function SearchBar({handleSearchSubmit}: SearchBarProps): JSX.Element {
  return (
    <form action="" onChange={e => handleSearchSubmit(e.target.value)}>
        <input type="text" placeholder="Search for a country..." />
    </form>
  )
}

export default SearchBar;