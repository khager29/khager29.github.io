import React, { ReactElement } from "react";
import { DataProps } from "./assets/resumeData";

interface DataLoaderProps {
    data: DataProps;
    children: ReactElement<DataProps> | ReactElement<DataProps>[];
}

export const DataLoader: React.FC<DataLoaderProps> = ({ data, children }) => {
    return (
        <>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, data);
                }
                return child;
            })}
        </>
    );
};
