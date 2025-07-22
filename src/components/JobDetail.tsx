'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getJobById } from '../api/jobapi'; 
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Job } from '../types/types';

interface JobDetailProps {
  jobId: string;
}

function JobDetail({ jobId }: JobDetailProps) {
  const router = useRouter();
  //const [job, setJob] = useState<any>(null);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (jobId) {
      getJobById(Number(jobId))
        .then(data => {
          setJob(data);
        })
        .catch(err => {
          console.error("❌ Failed to fetch job:", err);
        });
    }
  }, [jobId]);  
  
  

  if (!job) {
    return <div><p>Loading...</p> </div>;
  }

  return (
    <Box mb = {2} sx={{ padding: 4 }}>
    <Typography variant="h3" gutterBottom>{job.position}</Typography>
    <Typography  ><strong>Company:</strong> {job.company}</Typography>
    <Typography  ><strong>Location:</strong> {job.location}</Typography>
    <Typography >
      <strong>Skills:</strong> {Array.isArray(job.skills) ? job.skills.join(', ') : job.skills}
    </Typography>
    <Typography  ><strong>Mode:</strong> {job.mode}</Typography>
    <Typography  ><strong>Description:</strong> {job.description}</Typography>    
    <Typography  ><strong>Status:</strong> {job.status}</Typography>
    <Typography  ><strong>Posted Date:</strong> {job.postedDate}</Typography>
    
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={() => router.push('/jobs')}
      sx={{ mt: 2 }}
    >
      Back
    </Button>
  </Box>
    );
}

export default JobDetail;


