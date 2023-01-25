import http from "./baseurl";

// get all Movies api
const getAllMovies = async (search, currentPage) => {
    return await http.get(`movies?q=${search ? search : ""}&page=${currentPage ? currentPage : ""}`);
}


// get popular Movies api
const getPopularMovies = async () => {
    const { data } = await http.get("movies");

    // separate 6 popular movies
    const popularMovies =  data.data.splice(0, 6);
    return popularMovies;
}


export { getAllMovies, getPopularMovies };