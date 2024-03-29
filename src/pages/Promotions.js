import {useState, useEffect, useCallback} from 'react';

const promotionDetails = `http://localhost:4000/promotions`;

export default function Promotions() {
  const [films, setFilms] = useState([])

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('../images/promotions', '')] = r(item); });
    console.log(images)
    return images
  }
  
  const images = importAll(require.context('../images/promotions', false, /\.(jpe?g)$/));
 
  const getFilms = useCallback (
    async () => {
      let response;

    try {  
       response = await fetch(`${promotionDetails}`);
    }
    catch (error) {
      console.log(error);
    }

    if (response.status === 200) {
      const returnedFilms = await response.json();
      console.log({returnedFilms})
            setFilms(returnedFilms)
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
    <div>
      <h1>Latest Promotions</h1>
      <div className="promotions">
        {films.map(item => (
          <div key={item.title}>
            <img src={(images[item.image])} alt={item.title} width="200" />
            <p />
            <h4><a href={item.url}>{item.title}</a></h4>
            <p>{item.synopsis}</p>
            <p>{item.review}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
