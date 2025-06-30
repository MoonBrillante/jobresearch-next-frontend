'use client';

import JobList from '@/components/JobList';
import { useRouter } from 'next/navigation';
export default function JobsPage() {
    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        router.push('/login'); // Jump to the login page after logout
    };
    
    return <JobList logOut={handleLogout} />;
}

