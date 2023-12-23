import React from "react";

function SerieFilter(props) {
    const { onShowAll, series, onFilter } = props;

     //! BUSCAR CARROUSEL BOOTSTRAP

    // Create a Set to store unique series
  const uniqueSeries = [...new Set(series)];

    return (
    <div>
      <p>Filter by Serie</p>
      <button onClick={onShowAll}>Show All Cosplays</button>
      <br />
      <br />
      {uniqueSeries.map((serie) => (
        
        <button key={serie} onClick={() => onFilter(serie)}>
          {serie}
          {/* posar aquí una condició if serie === "StarWars" show this image */}
        </button>
      ))}
    </div>
  );
}

export default SerieFilter;