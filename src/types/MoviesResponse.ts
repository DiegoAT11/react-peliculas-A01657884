import { IMovieDetail } from "./MovieDetail";

export interface PagedMovieResponse<T = IMovieDetail> { 
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
