import api from "../api";

export const getTrendingPeople = async (time_window: string) => {
  try {
    const { data } = await api.get(`/trending/person/${time_window}`);
    return data;
  } catch (error) {
    throw error;
  }
};
