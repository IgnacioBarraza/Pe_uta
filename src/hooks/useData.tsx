import { DataContext } from "@/providers/dataProvider";
import { useContext } from "react";

export const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useDataProvider must be used within a DataProvider");
  
  return context;
};