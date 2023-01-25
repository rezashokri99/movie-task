import http from "./baseurl";

const getAllMovies = async (search, currentPage) => {
    return await http.get(`movies?q=${search ? search : ""}&page=${currentPage ? currentPage : ""}`);
}

const getPopularMovies = async () => {
    const { data } = await http.get("movies");
    const popularMovies =  data.data.splice(0, 6)
    return popularMovies;
}


export { getAllMovies, getPopularMovies };