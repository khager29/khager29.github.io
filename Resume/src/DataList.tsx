import { DataProps } from "./assets/resumeData";

export const DataList = <
    K extends keyof DataProps,
    T extends keyof DataProps[K]
>({
    data,
    info,
    type,
}: {
    data: DataProps;
    info: K;
    type: T;
}) => {
    const infoObject = data[info][type];
    if (!infoObject) {
        return null;
    }

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
