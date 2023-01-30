import {useState, useEffect, useCallback} from 'react';
import { Route, Routes, useParams, useRouteMatch } from "react-router-dom";
import Promotions from './Promotions';

const filmDetails = `http://localhost:4000/films`;

export default function FilmDetails() {
  const [films, setFilms] = useState([]);
  const { id } = useParams()

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('../images', '')] = r(item); });
    console.log(images)
    return images
  }
  
  const images = importAll(require.context('../images', false, /\.(jpe?g)$/));


  const getFilms = useCallback (
    async (query) => {
      let response;

    try {  
       response = await fetch(`${filmDetails}`);
    }
    catch (error) {
      console.log(error);
    }

    if (response.status === 200) {
      const returnedFilms = await response.json();
      console.log(returnedFilms)
      console.log(query)
      const film =  returnedFilms.find(film => film.id === query);
      console.log(film)
      //returnedFilms.length ? setFilms(film) :  setFilms([film]);
      setFilms(film)
    }
  }, [],
  );

  useEffect(() => {
    //Replaces to CDM and CDU
    console.log(id)
    //console.log(id.substring(0,id.indexOf(".")));
    //const query = id.toString() === '0'? `` :  `/${id.substring(0,id.indexOf("."))}`;
    //const query = id.substring(0,id.indexOf("."));
    const query = id;
    console.log(query)
    setTimeout(() => {
      getFilms(query);
    }, 200);
  }, []);

  return (
    <div className="content">
      <div className="product">
        {/* <div className="image">
          <img src={require('../images/' + id)} alt={id.substring(0,id.indexOf("."))} />
        </div> */}
        <div className="details">
          <img src={(images[films.image])} alt={films.title} width="400" />
          <h1><a href={films.url}>{films.title}</a></h1>
          <h2>Synopsis</h2>
          <p>{films.synopsis}</p>
          <h2>Review</h2>
          <p>{films.review}</p>
          <br />
          <br />
        </div>
      </div>

      <Routes>
        <Route path="/promotions" element={<Promotions />} />
      </Routes>
    </div>
  )
}
