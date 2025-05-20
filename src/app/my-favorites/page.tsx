"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/components/MovieList/MovieList";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";
import Pagination from "@/components/Pagination/Pagination"
import { IMovieDetail } from "@/types/MovieDetail";

const MyFavoritesPage = () => {
  const { guestSessionId } = useGuestSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!guestSessionId) return;
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // simulate 2s delay
      try {
        const data = await getFavoriteMovies(guestSessionId, page);
        setMovies(data?.results || []);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [guestSessionId, page]);

  return (
    <div>
      <div className="flex justify-between items-center mt-10 mb-4">
        <h3 className="text-3xl font-bold">My Favorite Movies</h3>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {loading && (
        <h5 className="text-lg text-gray-500 mb-2">Loading favorites...</h5>
      )}

      {!loading && movies.length === 0 && (
        <div className="text-center mt-10 text-gray-600">
          <p className="text-xl">You don't have any favorite movies yet.</p>
          <p className="text-sm mt-2">Go to a movie's detail page and click "Add to Favorites" to see it here.</p>
        </div>
      )}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MyFavoritesPage;