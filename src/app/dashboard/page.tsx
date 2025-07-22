'use client';
import dynamic from 'next/dynamic';


const DashboardTabs = dynamic(() => import('./DashboardTabs'), {
    ssr: false,
    });

export default function DashboardPageWrapper() {

    return (
        <div style={{ padding: '2rem'}}>
            <DashboardTabs  />
        </div>
    );
}
