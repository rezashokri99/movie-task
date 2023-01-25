import queryString from "query-string";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllMovies } from "../../helpers/api";
import styles from "./movieList.module.scss";

const MovieList = () => {
    let [movies, setMovies] = useState([]);
    let [paginationData, setPaginationData] = useState(true);
    let [loading, setLoading] = useState(true);
    let [loadingArr, setLoadingArr] = useState([1, 1, 1, 1, 1, 1, 1, 1]);


    const navigate = useNavigate();
    const location = useLocation();
    const { page: currentPage, search } = queryString.parse(location.search);



    useEffect(() => {
        const getMoviesFn = async () => {
            setLoading(true);
            try {
                const { data } = await getAllMovies(search, currentPage)
                setMovies(data.data);
                setPaginationData(data.metadata);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }

            setLoading(false);
        }
        getMoviesFn()
    }, [currentPage, search])


    // function handles the panination click
    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        navigate({
            search: `?search=${search ? search : ""}&page=${selectedPage}`,
        });
        window.scrollTo(0, 0)
    };

    return (
        <div className={styles.movie_list_container}>

            <div className={styles.movie_list}>
                {
                    loading ?
                        loadingArr?.map((item, index) => (
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
                        movies.length ?
                            movies.map((movie) => (
                                <div key={movie.id} className={styles.movie}>
                                    <p to={`/movies/${movie.id}`} className={styles.movie_image_container}>
                                        <img src={movie.poster} className={styles.movie_image} alt={movie.title} />
                                    </p>
                                    <div className={styles.movie_content}>
                                        <h2 className={styles.title_container}>
                                            <p to={`/movies/${movie.id}`} className={styles.title}>
                                                {movie.title}
                                            </p>
                                        </h2>
                                        <div className={styles.movie_footer}>
                                            <div className={styles.movie_genres}>
                                                {
                                                    movie.genres?.map((genre) => (
                                                        <span key={genre} className={styles.genre}>{genre}</span>
                                                    ))
                                                }
                                            </div>
                                            <div className={styles.year_container}>
                                                <span className={styles.year}>{movie.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) :
                            <div className={styles.not_found_videos}>
                                The desired movie was not found.
                            </div>
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