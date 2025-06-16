import { createContext, useContext } from "react";
import { DataProps } from "./assets/resumeData";

export const DataContext = createContext<DataProps | null>(null);
export const useData = () => useContext(DataContext);
