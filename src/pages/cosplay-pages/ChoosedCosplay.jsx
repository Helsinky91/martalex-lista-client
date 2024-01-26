import React from 'react'
import { Link } from 'react-router-dom';
import MissingMeme from "../../assets/Missing-meme.png";

function ChoosedCosplay({status}) {
  return (
    <div className="choosed-cosplay">
       
          <h2>UPS! LLEGAS TARDE!!</h2>
          <h5>Parece que otra persona ha sido más rápida que tú...</h5>
          <button className="btn btn-yellow-cosplay"><Link to={"/cosplay/cosplay-list"}>Lista de Cosplays disponibles</Link></button>
          <br />
          <img src={MissingMeme} alt="Missing meme" />

          
    </div>
)}

export default ChoosedCosplay;