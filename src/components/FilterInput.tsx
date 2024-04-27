import React from 'react'

export default function FilterInput() {
  return (
    <form action="">
        <select id="region">
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
