import { Link } from "react-router-dom"
import {useState, useEffect, useCallback} from 'react';

function importAll(r) {
  
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('../images/', '')] = r(item); });
  delete images["./WonkyMotionLogo.jpg"]
	return images
}

const images = importAll(require.context('../images', false, /\.(jpe?g)$/));
const films = `http://localhost:4000/films`;

export default function Films() {
  const [allfilms, setAllFilms] = useState([])

  const getFilms = useCallback (
    async () => {
      let response;
  
    try {  
       response = await fetch(`${films}`);
    }
    catch (error) {
      console.log(error);
    }
  
    if (response.status === 200) {
      const returnedFilms = await response.json();
      console.log({returnedFilms})
      setAllFilms(returnedFilms)
    }
  }, [],
  );

  useEffect(() => {
    //Replaces to CDM and CDU
   setTimeout(() => {
      getFilms();
    }, 200);
  }, []);

  return (
    <div className="content">
      <h3>Wonkymotion Films</h3>
      <div className="films">
      {allfilms.map(item => (
          <div key={item.title}>
            <img src={(images[item.image])} alt={item.title} width="200" />
            <Link to={`/films/id/${[item.id]}`}>
              <h4>{item.title.length > 22 ? item.title.substring(0,22) + "...": item.title}</h4>
            </Link>
          </div>
        ))}
        {/* {Object.entries(images).map( ([key, value]) => (
          <div key={key}>
            <Link to={`/films/id/${key}`}>
              <img src={value} alt={key} width="200"/>
            </Link>
          </div>
        ))} */}
      </div>
    </div>
  )
}
