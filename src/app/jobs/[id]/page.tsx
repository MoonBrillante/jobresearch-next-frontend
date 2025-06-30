// src/app/jobs/[id]/page.tsx


/*
import JobDetail from '@/components/JobDetail';

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const id = params?.id;
  if (!id) return <div>Invalid job ID</div>;

  return <JobDetail jobId={id} />;
}*/

import JobDetail from '@/components/JobDetail';
type Props = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: Props) {
  return <JobDetail jobId={params.id} />;
}







