interface DataProps {
    education: {
        [key: string]: {
            major: string;
            minor?: string;
            gpa: string;
            honors?: string;
            school: string;
            startDate: string;
            endDate: string;
            location: string;
        };
    };
    workExperience: {
        [key: string]: {
            company: string;
            title: string;
            location: string;
            startDate: string;
            endDate: string;
            responsibilities: string[];
        };
    };
    skills: {};
    projects: {};
    contactInfo: {
        name: string;
        phone: string;
        email: string;
        linkedIn: string;
        address: string;
        street: string;
        cityState: string;
    };
}

export const data: DataProps = {
    education: {
        college: {
            major: "Physics",
            minor: "Mathematics",
            gpa: "3.777",
            honors: "magna cum laude",
            school: "Notre Dame of Maryland University",
            startDate: "August 2003",
            endDate: "May 2007",
            location: "Baltimore, Maryland",
        },
        gradSchool: {
            major: "Leadership in Teaching",
            gpa: "4.000",
            school: "Notre Dame of Maryland University",
            startDate: "January 2009",
            endDate: "May 2012",
            location: "Baltimore, Maryland",
        },
    },
    workExperience: {
        current: {
            company: "Great Minds PBC",
            title: "Senior Digital Interactives Developer",
            location: "Remote",
            startDate: "March 2020",
            endDate: "current",
            responsibilities: [
                "Led User Acceptance Testing efforts for over 200 digital lessons",
                "Designed and authored over 160 digital interactives using JavaScript and GeoGebra to help students visualize and explore abstract mathematical concepts",
                "Retrofitted and redesigned interactives to conform to Web Content Accessibility Guidelines 2.1 Level AA",
                "Served as an advisor to product owners throughout project lifecycles on topics of accessibility, project scope and team capacity, and feasibility",
                "Counseled lesson writers on how best to integrate digital technology into print materials",
                "Used Jira to prioritize and communicate progress on projects",
                "Created, tested, reviewed, and maintained codebase using GitHub",
                "Created and maintained documentation of code in Confluence",
                "Analyzed curriculum for evidence of bias and proposed solutions",
            ],
        },
        previous1: {
            company: "Our Lady of Good Counsel High School",
            title: "Mathematics and Physics Teacher",
            location: "Olney, Maryland",
            startDate: "August 2008",
            endDate: "June 2020",
            responsibilities: [
                "Developed curriculum, activities, and assessments to meet the diverse needs of 125 students per year",
                "Created 8 Desmos-based projects per year to encourage digital literacy and creative thinking",
                "Identified and adapted lessons for students with learning disabilities using educational technology",
                "Differentiated instruction to accommodate all students’ needs",
            ],
        },
        previous2: {
            company: "Joint Center for Earth Systems Technology",
            title: "Research Assistant",
            location: "Baltimore, Maryland",
            startDate: "June 2006",
            endDate: "August 2008",
            responsibilities: [
                "Modeled atmospheric data pertaining to pyro-cumulonimbus clouds using Mathematica and MATLAB",
                "Maintained precise weather records on a Linux system",
                "Analyzed data pertaining to plant fluorescence after application of DCMU using Excel",
                "Analyzed data from remote sensing satellites",
                "Performed experiments on corn and pepper plants in the USDA fields",
            ],
        },
    },
    skills: {},
    projects: {},
    contactInfo: {
        name: "Kimberly A. Hager",
        phone: "443-340-8607",
        email: "hager.kimberly.a@gmail.com",
        linkedIn: "https://www.linkedin.com/in/kimberly-hager/",
        address: "11583 Liberty Oak Drive, Frederick, MD 21701",
        street: "11583 Liberty Oak Drive",
        cityState: "Frederick, Maryland",
    },
};
