'use client';

import React, { useEffect, useState } from "react";
import { getTopRatedMovies } from "@/services/movies/getTopRatedMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination"
import { IMovieDetail } from "@/types/MovieDetail";

const TopRatedClientPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2s delay
      try {
        const data = await getTopRatedMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
      setLoading(false);
    };

    fetchTopRatedMovies();
  }, [page]);

  return (
    <div className="p-6 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-3xl font-bold">Top Rated Movies</h3>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
      {/* Loading indicator */}
      {loading && <h5 className="text-lg text-gray-500 mb-2">Loading...</h5>}
      {/* Grid Layout */}
      <MovieList movies={movies} />
    </div>
  );
};

export default TopRatedClientPage;