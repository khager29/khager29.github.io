import { data } from "./assets/resumeData";

export const Header = () => {
    const { contactInfo } = data;

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
