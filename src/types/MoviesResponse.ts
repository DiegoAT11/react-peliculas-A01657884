import { IMovieDetail } from "./MovieDetail";

export interface MoviesResponse<T = IMovieDetail> { 
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
