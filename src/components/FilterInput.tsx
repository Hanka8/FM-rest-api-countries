interface FilterInputProps {
    handleFilterSubmit: (region: string) => void;
}

export default function FilterInput({handleFilterSubmit} : FilterInputProps) {
  return (
    <form action="">
        <select id="region" onChange={e =>handleFilterSubmit(e.target.value)}>
          <option value="">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
    </form>
  )
}
