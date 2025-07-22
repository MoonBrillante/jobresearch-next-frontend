'use client';
import { useEffect, useState } from 'react';
import { getJobs } from '../../api/jobapi';
import { Job } from '../../types/types';
import DashboardTabs from './DashboardTabs';

export default function DashboardPageWrapper() {
    
    const [jobs, setJobs] = useState<Job[]>([]);

    useEffect(() => {
        getJobs()
            .then(setJobs)
            .catch(err => console.error("❌ Failed to fetch jobs:", err));
    }, []);

    return (
        <div style={{ padding: '2rem'}}>
            <DashboardTabs jobs={jobs} />
        </div>
    );
}
