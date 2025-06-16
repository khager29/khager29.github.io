import { DataContext } from "./DataContext";
import { data } from "./assets/resumeData";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
