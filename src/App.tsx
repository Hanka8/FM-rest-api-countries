import Main from './components/Main'
import FilterInput from './components/FilterInput'
import { useState } from 'react'

function App() {

  const [region, setRegion] = useState('')

  const handleFilterSubmit = (region: string) => {
    setRegion(region);
  }

  return (
    <>
      <FilterInput handleFilterSubmit={handleFilterSubmit} />
      <Main region={region}/>
    </>
  )
}

export default App
