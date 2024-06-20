'use client'
import MultiStepForm from "../../../components/MultiStepForm";
import {useParams} from "next/navigation";
const StudentProfile = () => {
  const params = useParams()
  return <MultiStepForm userId={params.userId}/>;
};

export default StudentProfile;
