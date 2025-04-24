interface Project {
    name: string;
    type: string;
    details: string;
    start: string;
    end: string;
    video_url: string;
    repo_link: string;
}

const projects: Project[] = [
    {
        name: "",
        type: "",
        details: "",
        start: "",
        end: "",
        video_url: "",
        repo_link: "",
    },
    {
        name: "Tabbin",
        type: "Personal",
        details: "Progressively utilizing Javascript, React, & Chakra CSS UI to deploy a social media web app capable of CRUD operations, JWT authentication, and image storage for workplace usage. Designed a Supabase/PostgreSQL database for user data and social media post entity relationships",
        start: "November 2024",
        end: "Current",
        video_url: "",
        repo_link: "",

    },
    {
        name: "DataFeeder",
        type: "University",
        details: "Composed a PyQT GUI application which automates creation and customization of data analytic visualizations. Used Python classes to practice inheritance and polymorphism for Pandas/Matplotlib graph creation types. Added AI dataset examination tool using LangChain Chroma and OpenAI LLM",
        start: "February 2025",
        end: "February 2025",
        video_url: "",
        repo_link: "",
    },
    {
        name: "Apollo 11 Sim",
        type: "University",
        details: "Developed a 2D object-oriented C++ program simulating a lunar landing with client-side interactive spacecraft maneuvering, achieving 100% accuracy on all unit tests. Implemented custom physics engine and pre-made OpenGL rendering to create a realistic simulation interface",
        start: "January 2025",
        end: "January 2025",
        video_url: "",
        repo_link: "",
    },
    {
        name: "Rex-Ride",
        type: "Hackathon",
        details: "Collaborated with a team of 3 for 24-hour hackathon to rapidly develop a web-based ride-sharing platform, enabling users to efficiently find or offer travel assistance. Created a back-end infrastructure using Python, Flask framework, and Google Firebase, creating RESTful API endpoints for data authentication, retrieval, and updates from a non-relational database",
        start: "October 2024",
        end: "October 2024",
        video_url: "https://www.youtube.com/embed/P2dTXCA2ozc?si=KaYlgLlJqE18nXlS",
        repo_link: "",
    },
]

export default projects;