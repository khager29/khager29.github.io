import { useData } from "./DataContext";

export const Header = () => {
    const data = useData();
    if (!data) {
        return null;
    }
    const { contactInfo } = data;
    if (!contactInfo) {
        return null;
    }
    return (
        <>
            <h1>{contactInfo.name}</h1>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            <a href={`tel:${contactInfo.phone.replace("-", "")}`}>
                {contactInfo.phone}
            </a>
            <a href={contactInfo.linkedIn}>LinkedIn Profile</a>
            <p>{contactInfo.cityState}</p>
        </>
    );
};
