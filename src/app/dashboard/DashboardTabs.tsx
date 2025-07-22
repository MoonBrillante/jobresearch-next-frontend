'use client';
import { useState } from 'react';
import { Box, Tabs, Tab, Stack, Button } from '@mui/material';
import { Bar, Pie } from 'react-chartjs-2';
import { subDays, isAfter, format, parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../api/jobapi';
import { Job } from '../../types/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement, // Pie chart
    Title,
    Tooltip,
    Legend
    );

type Props = {
    jobs: Job[];
};

export default function DashboardTabs() {
    const router = useRouter();
    const [tab, setTab] = useState(0);

    const { data: jobs = [], isLoading, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: getJobs,
    });
    
    const groupCountBy = (key: keyof Job) => {
        const map = new Map<string, number>();
        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);

        jobs.forEach(job => {
            const rawKey = job[key];
            if (key === 'postedDate') {
                if (
                    typeof rawKey !== 'string' ||
                    !rawKey ||
                    !isAfter(parseISO(rawKey), thirtyDaysAgo)
                ) {
                    return; 
                }
            }

            const groupKey = rawKey ? String(rawKey) : 'No Status';
            map.set(groupKey, (map.get(groupKey) || 0) + 1);
        });

        return {
            labels: Array.from(map.keys()),
            counts: Array.from(map.values()),
        };
    };

    const byDate = groupCountBy('postedDate');
    const byCompany = groupCountBy('company');
    const byPosition = groupCountBy('position');
    const byStatus = groupCountBy('status');


    const getChartData = (
        labels: string[], 
        counts: number[], 
        label: string,
        backgroundColor: string
        ) => ({
        labels: labels.map(label => {
            if (tab === 0) return format(parseISO(label), 'yyyy-MM-dd');
            return label;
        }),
        datasets: [
            {
                label,
                data: counts,
                backgroundColor,
            },
        ],
    });


    const getChartOptions = () => ({
        responsive: true,
        maintainAspectRatio: false,  // Allow the chart to fill the container
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    precision: 0,
                },
            },
        },
    });


    return (
        <Box>
            <Stack direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 3, px: 2 }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => router.push('/jobs')}
                sx={{ textTransform: 'none' }}
            >
                Back</Button>
            <Tabs value={tab} onChange={(_, newVal) => setTab(newVal)} centered>
                <Tab label="📅 By Date" />
                <Tab label="🏢 By Company" />
                <Tab label="💼 By Position" />
                <Tab label="📊 By Status" />
            </Tabs>
            </Stack>
            <div style={{ 
                paddingTop: '2rem', 
                height: '400px', 
                width: '80%', 
                margin: '2rem auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                {tab === 0 && <Bar
                    data={getChartData(
                        byDate.labels, 
                        byDate.counts, 
                        'Applications per Day',
                        'rgba(0, 200, 200, 0.4)')}
                    options={getChartOptions()} />}
                {tab === 1 && <Bar
                    data={getChartData(
                        byCompany.labels, 
                        byCompany.counts, 
                        'Applications per Company',
                        'rgba(255, 99, 132, 0.5)')}
                    options={getChartOptions()}
                />}
                {tab === 2 && <Bar
                    data={getChartData(
                        byPosition.labels, 
                        byPosition.counts, 
                        'Applications per Position',
                        'rgba(54, 162, 235, 0.5)')}
                    options={getChartOptions()}
                />}
                {tab === 3 && (
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                    >
                    <Pie
                        data={{
                            labels: byStatus.labels,
                            datasets: [
                                {
                                    label: 'Applications by Status',
                                    data: byStatus.counts,
                                    backgroundColor: [
                                        '#4caf50', // OFFER
                                        '#2196f3', // APPLIED
                                        '#f44336', // REJECTED
                                        '#ff9800', // INTERVIEWING
                                        '#9c27b0', // INTERESTED
                                        '#9e9e9e', // No Status / other
                                    ],
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const value = context.parsed;
                                            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
                                            const percent = ((value / total) * 100).toFixed(1);
                                            const label = context.label || 'No Status';
                                            return `${label}: ${value} (${percent}%)`;
                                        },
                                    },
                                },
                            },
                        }}
                    /> </div>
                )}

            </div>
        </Box>
    );
}
