interface FilterInputProps {
    handleFilterSubmit: (region: string) => void;
}

export default function FilterInput({handleFilterSubmit} : FilterInputProps) {
  return (
    <form action="" className="filter-form">
        <select className="filter-select" id="region" onChange={e =>handleFilterSubmit(e.target.value)}>
          <option className="filter-option hidden" value="" disabled selected>Filter by region</option>
          <option className="filter-option" value="">All</option>
          <option className="filter-option" value="Africa">Africa</option>
          <option className="filter-option" value="Americas">Americas</option>
          <option className="filter-option" value="Asia">Asia</option>
          <option className="filter-option" value="Europe">Europe</option>
          <option className="filter-option" value="Oceania">Oceania</option>
        </select>
    </form>
  )
}
