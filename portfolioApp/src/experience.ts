export interface Experience {
    title: string;
    company: string;
    location: string;
    details: string;
    start: string;
    end: string;
  }

const workExperiences: Experience[] = [
    {
        title: "Quality Assurance Auditor",
        company: "Brigham Young University-Idaho",
        location: "Rexburg, Idaho",
        details: "",
        start: "August 2024",
        end: "April 2025"
    },
    {
        title: "IT Service Desk Shift Lead",
        company: "Brigham Young University-Idaho",
        location: "Rexburg, Idaho",
        details: "Protected user data information by leading 4+ IT staff members for fulfillment of administrative tasks, maintaining detailed and accurate records, and problem-solving with troubleshooting procedures. Achieved consistent monthly team performance above 90% by adapting training methods, proactive monitoring, and compiling bi-weekly status reports",
        start: "April 2024",
        end: "December 2024"
    },
    {
        title: "IT Service Desk Analyst",
        company: "Brigham Young University-Idaho",
        location: "Rexburg, Idaho",
        details: "Answered requestor calls, solving majority of technical issues, following knowledge based articles and other privacy/legal procedures daily. Resolved 5+ ticket reports daily, to carefully document steps taken to resolve technological issues. Collaborated with 5+ departments as needed to determine responsibility of varying issues and obtain best solution possible, collaborated with 4+ IT members",
        start: "April 2023",
        end: "April 2024"
    },
    {
        title: "Front-End Associate",
        company: "Walmart",
        location: "Idaho Falls, Idaho",
        details: "Conducted 50+ payment transactions throughout workday with minimal error. Translated conversations between customers and other associates for money order requests daily",
        start: "September 2023",
        end: "December 2023"
    },
    {
        title: "Sales Floor Associate",
        company: "Journeys",
        location: "Idaho Falls, Idaho",
        details: "Led and trained other co-workers, motivating team members to reach daily goals of selling store product. Audited store inventory, processed online orders, and implemented company campaigns bi-weekly",
        start: "September 2020",
        end: "December 2020"
    },
    {
        title: "Retail Associate",
        company: "Lowe's",
        location: "Idaho Falls, Idaho",
        details: "Operated forklift machine equipment to receive, store, and ship items daily, used computer skills for online orders. Provide solutions for client project ideas through company resources and store product.",
        start: "March 2020",
        end: "August 2020"
    },
    {
        title: "Customer Service Associate",
        company: "Kohls",
        location: "Idaho Falls, Idaho",
        details: "Aided customers in locating store product. Serviced patrons in both english and spanish.",
        start: "September 2019",
        end: "January 2020"
    }
]

export default workExperiences;