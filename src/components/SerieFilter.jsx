import React from "react";
import placeholderImg from "../assets/placeholderImg.png";
import asterix from "../assets/LogoAsterix.png";
import attack from "../assets/LogoAttack.png";
import coco from "../assets/LogoCoco.png";
import dragonBall from "../assets/LogoDragonBall.png";
import drSlumpp from "../assets/LogoDrSlump.png";
import evangelion from "../assets/LogoEvangelion.png";
import fullmetal from "../assets/LogoFullmetalAlchemist.png";
import futurama from "../assets/LogoFuturama.png";
import harryPotter from "../assets/LogoHarryPotter.png";
import kimetsunoyaiba from "../assets/LogoKimetsunoyaiba.png";
import kindomHearts from "../assets/LogoKingdomHearts.png";
import lotr from "../assets/LogoLOTR.png";
import maryPoppins from "../assets/LogoMaryPoppins.png";
import powerRangers from "../assets/LogoMyghtyMorphinPowerRangers.png";
import naruto from "../assets/LogoNaruto.png";
import nightmareBeforeChristmas from "../assets/LogoNightmareBefreChristmas.png";
import pokemon from "../assets/LogoPokemon.png";
import powerfuffGirls from "../assets/LogoPowerpuffGirls.png";
import ranma from "../assets/LogoRanma.png";
import sailorMoon from "../assets/LogoSailorMoon.png";
import starWars from "../assets/LogoStarWars.png";
import streetFighter from "../assets/LogoStreetFighter.png";
import ghibli from "../assets/LogoStudioGhibli.png";
import superMario from "../assets/LogoSuperMario.png";
import tintin from "../assets/LogoTintin.png";
import toyStory from "../assets/LogoToyStory.png";
import urutseiYatsura from "../assets/LogoUrutseiYatsura.png";
import zelda from "../assets/LogoZelda.png";

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
            <img src={starWars} alt={serie} width={80} />
          ) : serie === "Harry Potter" ? (
            <img src={harryPotter} alt={serie} width={80} />
          ) : serie === "LOTR" ? (
            <img src={lotr} alt={serie} width={80} />
          ) : serie === "Naruto" ? (
            <img src={naruto} alt={serie} width={80} />
          ) : serie === "Shingeku no Kyojin" ? (
            <img src={attack} alt={serie} width={80} />
          ) : serie === "Toy Story" ? (
            <img src={toyStory} alt={serie} width={80} />
          ) : serie === "Coco" ? (
            <img src={coco} alt={serie} width={80} />
          ) : serie === "Mary Poppins" ? (
            <img src={maryPoppins} alt={serie} width={80} />
          ) : serie === "Dr Slump" ? (
            <img src={drSlumpp} alt={serie} width={80} />
          ) : serie === "Pokémon" ? (
            <img src={pokemon} alt={serie} width={80} />
          ) : serie === "Dragon Ball" ? (
            <img src={dragonBall} alt={serie} width={80} />
          ) : serie === "Kimetsu no Yaiba" ? (
            <img src={kimetsunoyaiba} alt={serie} width={80} />
          ) : serie === "Mighty Morphin Power Rangers" ? (
            <img src={powerRangers} alt={serie} width={80} />
          ) : serie === "Ranma" ? (
            <img src={ranma} alt={serie} width={80} />
          ) : serie === "Futurama" ? (
            <img src={futurama} alt={serie} width={80} />
          ) : serie === "PowerPuff Girls" ? (
            <img src={powerfuffGirls} alt={serie} width={80} />
          ) : serie === "Super Mario" ? (
            <img src={superMario} alt={serie} width={80} />
          ) : serie === "Studio Ghibli" ? (
            <img src={ghibli} alt={serie} width={80} />
          ) : serie === "Kingdom Hearts" ? (
            <img src={kindomHearts} alt={serie} width={80} />
          ) : serie === "Legend of Zelda" ? (
            <img src={zelda} alt={serie} width={80} />
          ) : serie === "Nightmare before Christmas" ? (
            <img src={nightmareBeforeChristmas} alt={serie} width={80} />
          ) : serie === "Street Fighter II" ? (
            <img src={streetFighter} alt={serie} width={80} />
          ) : serie === "Asterix" ? (
            <img src={asterix} alt={serie} width={80} />
          ) : serie === "Tintin" ? (
            <img src={tintin} alt={serie} width={80} />
          ) : serie === "Evangelion" ? (
            <img src={evangelion} alt={serie} width={80} />
          ) : serie === "Urusei Yatsura" ? (
            <img src={urutseiYatsura} alt={serie} width={80} />
          ) : serie === "Fullmetal Alchemist" ? (
            <img src={fullmetal} alt={serie} width={80} />
          ) : serie === "Sailor Moon" ? (
            <img src={sailorMoon} alt={serie} width={80} />

          ) : (
            <span>{serie}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default SerieFilter;