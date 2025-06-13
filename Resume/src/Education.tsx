import { data } from "./assets/resumeData";
const { education } = data;

const EduData = ({ type }: { type: string }) => {
    const infoArray = Object.values(
        education[type as keyof typeof education] ?? {}
    );
    const infoMap = infoArray.map((item: string) => (
        <li key={item} className="m-0 list-none">
            {item}
        </li>
    ));
    return infoMap;
};

export const Education = () => {
    return (
        <>
            <h2>Education</h2>
            <div className="flex flex-row m-1">
                <div className="flex flex-col">
                    <h3>College</h3>
                    <EduData type="college" />
                </div>
                <div className="flex flex-col">
                    <h3>Graduate School</h3>
                    <EduData type="gradSchool" />
                </div>
            </div>
        </>
    );
};
