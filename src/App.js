import MovieList from "./components/movieList";
import Slider from "./components/slider";
import Layout from "./components/layout";
import './styles/App.scss';

function App() {

  return (
    <Layout>
      <div className="container">
        <MovieList />
        <Slider />
      </div>
    </Layout>
  );
}

export default App;
