import { useEffect, useState } from "react";
import MovieList from "./components/movieList";
import Slider from "./components/slider";
import { getAllMovies } from "./helpers/api";
import './App.scss';

function App() {
  let [moviesData, setMoviesData] = useState([]);
  let [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getMoviesFn = async () => {
  //     setLoading(true);
  //     const { data } = await getAllMovies()
  //     setMoviesData(data);
  //     setLoading(false);
  //     console.log(data);
  //   }
  //   getMoviesFn()
  // }, [])

  if (!loading) {
    return <div>loading...</div>
  }
  return (
    <div className="container">
    <MovieList />
      {/* <Slider /> */}
    </div>
  );
}

export default App;
