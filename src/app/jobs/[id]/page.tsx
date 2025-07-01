// src/app/jobs/[id]/page.tsx

import JobDetail from '@/components/JobDetail';
type Props = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: Props) {
  return <JobDetail jobId={params.id} />;
}







