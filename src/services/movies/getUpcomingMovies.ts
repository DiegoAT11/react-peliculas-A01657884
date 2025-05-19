import { MoviesResponse } from "@/types/MoviesResponse";
import api from "../api";

export const getUpcomingMovies = async (): Promise<MoviesResponse> => {
  try {
    const { data } = await api.get("/movie/upcoming?language=en-US");
    return data;
  } catch (error) {
    throw error;
  }
};
