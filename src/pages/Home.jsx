import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.png"
import Signup from './Signup';
import { AuthContext } from "../context/auth.context"


function Home() {

  // const { isLoggedIn } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(true);

  const toggleContent = () => {
    setToggleState(!toggleState);
  };

  return (
    <div className="dashboard">
      <div className='app-logo'>
        <img src={logo} alt="MartAlex logo" width={400} />
      </div>


      <div className="main-text">
        <a href="#" onClick={toggleContent}>
          {toggleState ? 'ESP' : 'CAT'}
        </a>

        {/* Image to toggle content */}
        {/* <img
          src={toggleState ? imageA : imageB}
          alt={toggleState ? 'Content A' : 'Content B'}
          onClick={toggleContent}
        /> */}

        {toggleState ? (
          // CAT info
          <section>
            <p>
              Ets a punt d'accedir a la llista de convidats, que com veuràs són personatges que necessiten encarnar-se en cadascun de vosaltres per a poder assistir al bodorrio.
              Si us plau, tria un cosplay per a lluir-lo durant la Major Festa de MartAlex <b>(REQUISIT INDISPENSABLE)</b>.
            </p>
            <p>
              Escull sàviament, estudia't el personatge visualitzant la sèrie i/o película, tant si el coneixes com si no.
              El cosplay serà l'unic conjunt que duràs durant tot el fiestón.
              Pensa que tothom estarà caracteritzat, no seràs pas l'únic o l'única.
              Recordeu, és un cosplay i no és una disfressa. Us esperem ben elegants lluint la millor caracterització.
            </p>
            <p>
              La prioritat en el calçat és que sigui còmode: feu tot el possible per a que s'assembli al calçat original i eviteu que us hagin de tallar els peus de matinada.
              Per últim, un consell: els accessoris ajuden a caracteritzar-se (lentilles, armes, objectes característics...).
            </p>
          </section>
        ) : (
          // ESP info
          <section>
            <p>
              Estás a punto de acceder a la lista de invitados, que como verás son personajes que necesitan encarnarse en cada uno de vosotros para poder asistir al bodorrio.
              Por favor, elige un cosplay para lucirlo durante la Mayor Fiesta de MartAlex <b>(REQUISITO INDISPENSABLE)</b>.
            </p>
            <p>
              Elige sabiamente, estudia el personaje visualizando la serie y/o película, tanto si lo conoces como si no.
              El cosplay será el único conjunto que llevaràs durante todo el fiestón.
              Piensa que todo el mundo estará caracteritzado, no serás el único o la única.
              Recordad, es un cosplay y no es un disfraz. Os esperamos bien elegantes luciendo la mejor caracterización.
            </p>
            <p>
              La prioridad en el calzado es que sea cómodo: haced todo lo posible para que se asemeje al calzado original y evitad que tengan que cortaros los pies de madrugada.
              Por último, un consejo: los accessorios ayudan a caracterizarse (lentillas, armas, objetos característicos...).
            </p>
          </section>
        )}

       

      <section className="home-buttons">
        <Link to="/signup"><button className="btn-red btn btn-home">Regístrate</button></Link>
        <Link to="/login"><button className="btn-blue btn btn-home">Entra</button></Link>
      </section>

      </div>

      {/* {!isLoggedIn ? (
          
          <div className="register-form">
            <Signup />
            </div>
        ):(<p></p>)} */}

    </div>

  )
}

export default Home;