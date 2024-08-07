import { IoIosSearch } from "react-icons/io";

type SearchBarProps = {
    handleSearchSubmit: (search: string) => void;
}

function SearchBar({handleSearchSubmit}: SearchBarProps): JSX.Element {

  return (
    <form className="search-form" onChange={e => handleSearchSubmit((e.target as HTMLInputElement).value)}>
        <IoIosSearch size={18} className="search-ico" />
        <input className="search-input" type="text" placeholder="Search for a country..." />
        <span className="focus-border"></span>
    </form>
  )
}

export default SearchBar;