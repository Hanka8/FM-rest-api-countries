import React from 'react'

export default function Country({flag, name, population, region, capital}) {
  return (
    <div className='country-card'>
        <p>{name}</p>
        <img src={flag} alt={name} />
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
    </div>
  )
}
