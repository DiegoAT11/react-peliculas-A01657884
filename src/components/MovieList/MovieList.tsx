import { IMovieDetail } from "@/types/MovieDetail";

import MovieCard from "../MovieCard/MovieCard";
import { useRouter } from "next/navigation";

interface MovieListProps {
  movies: IMovieDetail[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  const router = useRouter();

  const navigate = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          voteAverage={movie.vote_average}
          posterPath={movie.poster_path}
          releaseYear={movie.release_date}
          description={movie.overview}
          onClick={() => navigate(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;