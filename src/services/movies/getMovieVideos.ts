import api from "../api";

export const getMovieVideos = async (movieId: number) => {
  try {
    const { data } = await api.get(`/movie/${movieId}/videos?language=en-US`);
    return data.results;
  } catch (error) {
    throw error;
  }
};
