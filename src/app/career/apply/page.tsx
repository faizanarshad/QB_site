import { Suspense } from "react";
import CareerApplyClient from "@/components/CareerApplyClient";

type JobApplyPageProps = {
  searchParams?: {
    jobId?: string | string[];
  };
};

const JobApplicationPage = ({ searchParams }: JobApplyPageProps) => {
  const jobId = Array.isArray(searchParams?.jobId)
    ? searchParams?.jobId[0]
    : searchParams?.jobId;

  return (
    <Suspense
      fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />}
    >
      <CareerApplyClient jobId={jobId} />
    </Suspense>
  );
};

export default JobApplicationPage;