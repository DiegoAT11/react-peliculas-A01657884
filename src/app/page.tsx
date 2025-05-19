'use client';

import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/services/movies/getUpcomingMovies";
import MovieCarousel from "@/components/MovieCarousel/MovieCarousel";
import { MovieVideoDetail } from "@/types/MovieVideoDetail";
import { getMovieVideos } from "@/services/movies/getMovieVideos";
import { MoviesResponse } from "@/types/MoviesResponse";
import { IMovieDetail } from "@/types/MovieDetail";
import { getTrendingPeople } from "@/services/people/getTrendingPeople";
import { Person } from "@/types/PersonDetail";
import Image from "next/image";


const HomePage = () => {
  const [movies, setMovies] = useState<IMovieDetail[]>([]);
  const [trailers, setTrailers] = useState<MovieVideoDetail[]>([]);
  const [moviesResponse, setMoviesResponse] = useState<MoviesResponse | null>(null);
  const [trendingPeople, setTrendingPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data.results);
        setMoviesResponse(data);
      } catch (err) {
        console.error("Error loading movies: ", err);
      }
    };
    fetchUpcomingMovies();
  }, []);

  useEffect(() => {
    if (!moviesResponse) return;
    const fetchTrailers = async () => {
      try {
        const movieIds = moviesResponse.results.slice(0, 5).map((m) => m.id);
        const trailerPromises = movieIds.map(async (id) => {
          const videos = await getMovieVideos(id);
          const officialTrailer = videos.find(
            (v: MovieVideoDetail) =>
              v.type === "Trailer" &&
              v.site === "YouTube" &&
              v.official === true
          );
          return officialTrailer || null;
        });

        const trailerResults = await Promise.all(trailerPromises);
        const filteredTrailers = trailerResults.filter(Boolean) as MovieVideoDetail[];
        setTrailers(filteredTrailers);

      } catch (err) {
        console.error("Error loading trailers", err);
      }
    };
    fetchTrailers();
  }, [moviesResponse]);

  useEffect(() => {
    const fetchTrendingPeople = async () => {
      try {
        const people = await getTrendingPeople("day");
        setTrendingPeople(people.results);
      } catch (err) {
        console.error("Error loading trending people:", err);
      }
    };
    fetchTrendingPeople();
  }, []);

  return (
    <main>
      <section className="mt-10">
        <h2 className="text-3xl font-bold">Upcoming Movies</h2>
        <div className="grid justify-items-center mt-6 px-5">
          <MovieCarousel movies={movies} />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-bold">New Trailers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 justify-items-center px-28">
          {trailers.map((trailer) => (
            <div key={trailer.id}>
              <div className="aspect-video rounded-lg overflow-hidden shadow hover:scale-105 transition-transform duration-300">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Trending People</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center px-28">
          {trendingPeople
            .filter((person) => person.profile_path)
            .slice(0, 10)
            .map((person) => (
              <div key={person.id} className="text-center">
                <Image
                  src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                  alt={person.name}
                  width={200}
                  height={300}
                  className="rounded-lg mx-auto"
                />
                <h3 className="mt-2 text-lg font-semibold">{person.name}</h3>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default HomePage;