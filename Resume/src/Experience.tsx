import { useData } from "./DataContext";
import { DataList } from "./DataList";

export const Experience = ({}) => {
    const data = useData();
    if (!data) {
        return null;
    }
    const { workExperience } = data;
    return (
        <>
            <h2>Experience</h2>
            <div className="flex flex-row m-1">
                <div className="flex flex-col">
                    {Object.keys(workExperience).map((jobName) => (
                        <>
                            <h3>{workExperience[jobName].company}</h3>
                            <h4>{workExperience[jobName].title}</h4>
                            <div className="flex flex-col">
                                <p>{workExperience[jobName].location}</p>
                                <p>{`${workExperience[jobName].startDate} to ${workExperience[jobName].endDate}`}</p>
                            </div>
                            <ul className="flex flex-col items-start">
                                {workExperience[jobName].responsibilities.map(
                                    (responsibility) => (
                                        <li>{responsibility}</li>
                                    )
                                )}
                            </ul>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
};
