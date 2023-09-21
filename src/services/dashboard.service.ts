import { MoviesAPI, MoviesPosterAPI}  from "@/api/webApi";

export const getMovies = async () => {
    const { data } = await MoviesAPI.get('/movies');
    return data;
};

export const getPoster = async (movieName: string) => {
    const { data } = await MoviesPosterAPI.get(`&query=${movieName}'`);
    return data;
}