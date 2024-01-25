import React from 'react'
import { Link } from 'react-router-dom'

function ChoosedCosplay({status}) {
  return (
    <div className="choosed-cosplay">
       
          <h2>UPS, LLEGAS TARDE!!</h2>
          <h3>Parece que otra persona ha sido más rápida que tu...</h3>
          <button className="btn btn-yellow"><Link to={"/cosplay/cosplay-list"}>Lista de Cosplays disponibles</Link></button>
        
    </div>
)}

export default ChoosedCosplay;