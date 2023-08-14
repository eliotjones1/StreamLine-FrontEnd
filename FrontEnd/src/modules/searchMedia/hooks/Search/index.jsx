import { useContext } from "react";
import { SearchContext } from "/src/modules/searchMedia/contexts/Search";

export default function useSearch() {
  return useContext(SearchContext);
}