import { useContext } from "react";
import { CompaniesContext } from "/src/modules/supportedServices/contexts/Companies";

export default function useCompanies() {
  return useContext(CompaniesContext);
}