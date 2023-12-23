import React from "react";
import placeholderImg from "../assets/placeholderImg.png";

function SerieFilter(props) {
  const { series, onFilter } = props;

    // Create a Set to store unique series
  const uniqueSeries = [...new Set(series)];
  
  //! BUSCAR CARROUSEL BOOTSTRAP
  return (
    <div>
      {uniqueSeries.map((serie) => (
        <button className="serie-btn" key={serie} onClick={() => onFilter(serie)}>
          {serie === "Star Wars" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Harry Potter" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "LOTR" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Naruto" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Shingeku no Kyojin" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Toy Story" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Coco" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Mary Poppins" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Dr Slump" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Pokémon" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Dragon Ball" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Kimetsu no Yaiba" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Mighty Morphin Power Rangers" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Ranma" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Futurama" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "PowerPuff Girls" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Super Mario" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Studio Ghibli" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Kingdom Hearts" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Legend of Zelda" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Nightmare before Christmas" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Street Fighter II" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Asterix" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Tintin" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Evangelion" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Urusei Yatsura" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Fullmetal Alchemist" ? (
            <img src={placeholderImg} alt={serie} width={80} />
          ) : serie === "Sailor Moon" ? (
            <img src={placeholderImg} alt={serie} width={80} />

          ) : (
            <span>{serie}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default SerieFilter;