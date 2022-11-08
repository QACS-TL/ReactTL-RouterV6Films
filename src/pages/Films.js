import { Link } from "react-router-dom"

function importAll(r) {
	let images = {};
  r.keys().forEach((item, index) => { images[item.replace('../images/', '')] = r(item); });
  delete images["./WonkyMotionLogo.jpg"]
	return images
}

const images = importAll(require.context('../images', false, /\.(jpe?g)$/));

export default function Films() {
  return (
    <div className="content">
      <h3>Wonkymotion Films</h3>
      <div className="films">
        {Object.entries(images).map( ([key, value]) => (
          <div key={key}>
            <Link to={`/films/${key}`}>
              <img src={value} alt={key} width="200"/>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
