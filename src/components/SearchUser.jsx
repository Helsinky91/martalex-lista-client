import React from 'react'
import {useState} from 'react';


function SearchUser(props) {

  const [searchItem, setSearchItem] = useState("")

  const handleChange = (event) => {
      setSearchItem(event.target.value)
      props.filterList(event.target.value)
  }

  return (
    <div>
        <input value={searchItem} type="text" onChange={handleChange} placeholder="Busca un invitado"/>
    </div>
  )
}

export default SearchUser