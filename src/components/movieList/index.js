import queryString from "query-string";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllMovies, getPopularMovies } from "../../helpers/api";
import styles from "./movieList.module.scss";

const MovieList = () => {
    let [popularMovies, setPopularMovies] = useState([]);
    let [loading, setLoading] = useState(true);
    let [loadingArr, setLoadingArr] = useState([1,1,1,1,1,1,1,1]);
    
    let [paginationData, setPaginationData] = useState(true);


    const navigate = useNavigate();
    const location = useLocation();
    const parsed = queryString.parse(location.search);

    const { page: currentPage, search } = parsed;



    useEffect(() => {
        const getPopularMoviesFn = async () => {
            setLoading(true);
            const { data } = await getAllMovies(search, currentPage)
            setPopularMovies(data.data);
            setPaginationData(data.metadata);
            setLoading(false);
        }
        getPopularMoviesFn()
    }, [currentPage])


    // function handles the panination click
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        navigate({
            search: `page=${selectedPage}`,
        });
    };

    return (
        <div className={styles.movie_list_container}>

            {/* tab content */}
            <div className={styles.movie_list}>
                {
                    loading ?
                        loadingArr.map((item, index) => (
                            <div key={index} className={styles.movie_loader}>
                                <div className={styles.movie_image_container}>
                                </div>
                                <div className={styles.movie_content}>
                                    <h2 className={styles.title_container}>
                                        <p className={styles.title}>
                                        </p>
                                    </h2>
                                    <div className={styles.movie_footer}>
                                        <div className={styles.movie_genres}>
                                            <span className={styles.genre}></span>
                                            <span className={styles.genre}></span>
                                        </div>
                                        <div className={styles.year_container}>
                                            <span className={styles.year}></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                        popularMovies.map((film) => (
                            <div key={film.id} className={styles.movie}>
                                <Link to={`/movies/${film.id}`} className={styles.movie_image_container}>
                                    <img src={film.poster} className={styles.movie_image} alt={film.title} />
                                </Link>
                                <div className={styles.movie_content}>
                                    <h2 className={styles.title_container}>
                                        <Link to={`/movies/${film.id}`} className={styles.title}>
                                            {film.title}
                                        </Link>
                                    </h2>
                                    <div className={styles.movie_footer}>
                                        <div className={styles.movie_genres}>
                                            {
                                                film.genres.map((genre) => (
                                                    <span key={genre} className={styles.genre}>{genre}</span>
                                                ))
                                            }
                                        </div>
                                        <div className={styles.year_container}>
                                            <span className={styles.year}>{film.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                }

            </div>

            {/* pagination */}
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={Math.ceil(paginationData.total_count / 10)}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination justify-content-center mt-3"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage ? currentPage - 1 : 0}

            />
        </div>
    );
}

export default MovieList;