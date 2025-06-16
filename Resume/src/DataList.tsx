import { DataProps } from "./assets/resumeData";
import { useData } from "./DataContext";

export const DataList = <
    K extends keyof DataProps,
    T extends keyof DataProps[K]
>({
    info,
    type,
}: {
    info: K;
    type: T;
}) => {
    const data = useData();
    if (!data) {
        return null;
    }
    const infoObject = data[info][type];
    if (!data[info] || !infoObject) {
        return null;
    }
    console.log(infoObject);

    const infoArray: string[] = Object.values(
        infoObject as Record<string, string>
    );

    const infoMap = infoArray.map((item: string) => (
        <li key={item} className="m-0 list-none">
            {item}
        </li>
    ));

    return infoMap;
};
