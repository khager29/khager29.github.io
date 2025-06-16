import { data } from "./assets/resumeData";
import { DataList } from "./DataList";

export const Experience = ({}) => {
    return (
        <>
            <h2>Education</h2>
            <div className="flex flex-row m-1">
                <div className="flex flex-col">
                    <h3>College</h3>
                    <DataList info="workExperience" type="college" />
                </div>
                <div className="flex flex-col">
                    <h3>Graduate School</h3>
                    <DataList info="workExperience" type="gradSchool" />
                </div>
            </div>
        </>
    );
};
