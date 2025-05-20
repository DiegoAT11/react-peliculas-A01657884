'use client';

import React, { useEffect, useState } from "react";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination"
import { IMovieDetail } from "@/types/MovieDetail";

const PopularClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchPopularMovies();
  }, [page]);

  return (
    <div className="p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-bold">Popular Movies</h3>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      {/* Loading indicator */}
      {loading && <h5 className="text-lg text-gray-500 mb-2">Loading...</h5>}
      {/* Grid Layout */}
      <MovieList movies={movies} />
    </div>
  );
};

export default PopularClientPage;

