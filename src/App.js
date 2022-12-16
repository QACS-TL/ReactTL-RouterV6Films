import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Films from './pages/Films'
import FilmDetails from './pages/FilmDetails'


function App() {
  const [cartIsEmpty] = useState(false);
  
  return (
    <div className="App">
      <BrowserRouter>
        <nav>
          <h1>The Wonkymotion Film Company</h1>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/films">Films</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/films/id/:id" element={<FilmDetails />} />
          <Route path="/films" element={<Films />} />
          <Route path="/most_popular" element={(
            <div>
              <h2>
                UK's Most Popular Film
              </h2>
              <h3>Thunderbirds Are Go!</h3>
                <Link to={`https://www.youtube.com/watch?v=4q6z1FMS_mM`}>
                  <p>Thunderbirds</p>
                </Link>
            </div>
          )} />
          <Route path="/redirect" element={<Navigate to="/about" />} />
          <Route 
            path="/checkout" 
            element={cartIsEmpty ? <Navigate to="/films" />: <p>CheckOut</p>} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App