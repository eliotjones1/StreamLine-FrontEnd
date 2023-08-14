import { useContext } from "react";
import { TMDBContext } from "../../contexts/TMDB";

export default function useTMDB() {
  return useContext(TMDBContext);
}