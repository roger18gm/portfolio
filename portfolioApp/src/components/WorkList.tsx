import workExperiences from "../experience";
import WorkCard from "./WorkCard";

const WorkList = () => {
  return (
    <>
      {workExperiences.map((experience, index) => (
          <WorkCard key={index} experience={experience} />
        ))}  
    </>
  );
}

export default WorkList;
