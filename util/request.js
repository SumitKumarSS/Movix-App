import axios from "axios";

const API_KEY = "1f6e6606a302b6d80a8bf5c3b6d8797a";

const TMDB_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjZlNjYwNmEzMDJiNmQ4MGE4YmY1YzNiNmQ4Nzk3YSIsInN1YiI6IjY0YmQwM2Q2MGVkMmFiMDBjNWUzODBmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r4pcKJLf1Ofbocn79QLer7CfBTBJRyLoe4A3koKNtYg";

const BASE_URL = "https://api.themoviedb.org/3";

//Image
export const image500=path=>path?`https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342=path=>path?`https://image.tmdb.org/t/p/w342/${path}`:null
export const image185=path=>path?`https://image.tmdb.org/t/p/w185/${path}`:null
export const imageOG=path=>path?`https://image.tmdb.org/t/p/original/${path}`:null

//Movie Detail
const movieCreditsEndpoint = id=> `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id=> `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`;

//Person
const personDetailsEndpoint = id=> `${BASE_URL}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = id=> `${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}`;

const trendingMovies=`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
const upcomingMovies=`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`;
const topRatedMovies=`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
const searchMovies= `${BASE_URL}/search/movie?api_key=${API_KEY}`;

export const fetchDataFromApi = async (url, params) => {

    const options={
        method:'GET',
        url: url,
        params:params?params:{}
    }
    try{
        const response=await axios.request(options)
        return response.data
    }catch(error){
        console.log('error',error)
        return
    }
};

export const fetchTrending=()=>{
    return fetchDataFromApi(trendingMovies)
}
export const fetchUpcoming=()=>{
    return fetchDataFromApi(upcomingMovies)
}
export const fetchTopRated=()=>{
    return fetchDataFromApi(topRatedMovies)
}

export const fetchCredit=(MovieID)=>{
  return  fetchDataFromApi(movieCreditsEndpoint(MovieID))
}

export const fetchSimilar=(MovieID)=>{
    return fetchDataFromApi(similarMoviesEndpoint(MovieID))
}

export const fetchPerson=(PersonId)=>{
    return fetchDataFromApi(personDetailsEndpoint(PersonId))
}

export const fetchPmovies=(PersonId)=>{
    return fetchDataFromApi(personMoviesEndpoint(PersonId))
}
export const fetchSearch=(params)=>{
    return fetchDataFromApi(searchMovies,params)
}