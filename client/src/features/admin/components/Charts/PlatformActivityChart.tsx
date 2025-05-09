import { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useFetchArticlesQuery } from '@/api/articles';
import { useFetchCompetitionsQuery } from '@/api/competitions';
import { useFetchExhibitionsQuery } from '@/api/exhibitions';
import { useFetchAllJobsQuery } from '@/api/jobApi';
import { getUsers } from '@/api/users';
import { Users, Briefcase, Trophy, Image, FileText, Activity } from 'lucide-react';

import { groupByMonth, calculateStats } from '@/utils/statsHelpers';
import { COLORS } from '@/constants/chartColors';

import DataSkeleton from '@/components/DataSkeleton';
import ActivityStatsCards from './ActivityStatsCards';
import ActivityChart from './ActivityChart';
import DistributionPie from './DistributionPie';
import RecentOverview from './RecentOverview';

export default function PlatformActivityChart() {
  const [selectedType, setSelectedType] = useState<'users' | 'jobs' | 'competitions' | 'exhibitions' | 'articles'>('users');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');

  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  const { data: articles, isLoading: isLoadingArticles } = useFetchArticlesQuery();
  const { data: competitions, isLoading: isLoadingCompetitions } = useFetchCompetitionsQuery();
  const { data: exhibitions, isLoading: isLoadingExhibitions } = useFetchExhibitionsQuery();
  const { data: jobs, isLoading: isLoadingJobs } = useFetchAllJobsQuery();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const processedData = {
    users: groupByMonth(users, 'signupDate'),
    jobs: groupByMonth(jobs),
    competitions: groupByMonth(competitions),
    exhibitions: groupByMonth(exhibitions),
    articles: groupByMonth(articles)
  };

  const stats = calculateStats(processedData[selectedType]);

  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const t = new Date();
    return (
      d.getDate() === t.getDate() &&
      d.getMonth() === t.getMonth() &&
      d.getFullYear() === t.getFullYear()
    );
  };

  const additionalInfo = {
    users: [
      { label: 'New Today', value: users.filter(u => u.signupDate && isToday(u.signupDate)).length },
      { label: 'Verified Users', value: users.filter(u => u.isVerified).length },
      { label: 'Total Users', value: users.length }
    ],
    jobs: [
      { label: 'Open Jobs', value: jobs?.filter(j => j.isActive).length || 0 },
      { label: 'Closed Jobs', value: jobs?.filter(j => !j.isActive).length || 0 },
      { label: 'Total Jobs', value: jobs?.length || 0 }
    ],
    competitions: [
      { label: 'Active', value: competitions?.filter(c => c.status === 'published').length || 0 },
      { label: 'Completed', value: competitions?.filter(c => c.status === 'closed').length || 0 },
      { label: 'Participants', value: competitions?.reduce((sum, c) => sum + (c.participationCount || 0), 0) || 0 }
    ],
    exhibitions: [
      { label: 'Featured', value: exhibitions?.filter(e => e.featured).length || 0 },
      { label: 'Virtual', value: exhibitions?.filter(e => e.isVirtual).length || 0 },
      { label: 'Physical', value: exhibitions?.filter(e => !e.isVirtual).length || 0 }
    ],
    articles: [
      { label: 'Published', value: articles?.filter(a => a.status === 'published').length || 0 },
      { label: 'Draft', value: articles?.filter(a => a.status === 'draft').length || 0 },
      { label: 'Featured', value: articles?.filter(a => a.featured).length || 0 }
    ]
  };

  const distributionData = [
    { name: 'Users', value: users.length },
    { name: 'Jobs', value: jobs?.length || 0 },
    { name: 'Competitions', value: competitions?.length || 0 },
    { name: 'Exhibitions', value: exhibitions?.length || 0 },
    { name: 'Articles', value: articles?.length || 0 }
  ].filter(item => item.value > 0);

  const isLoading =
    (selectedType === 'users' && isLoadingUsers) ||
    (selectedType === 'jobs' && isLoadingJobs) ||
    (selectedType === 'competitions' && isLoadingCompetitions) ||
    (selectedType === 'exhibitions' && isLoadingExhibitions) ||
    (selectedType === 'articles' && isLoadingArticles);

  const getIcon = (type: string) => {
    switch (type) {
      case 'users': return <Users className="h-4 w-4" />;
      case 'jobs': return <Briefcase className="h-4 w-4" />;
      case 'competitions': return <Trophy className="h-4 w-4" />;
      case 'exhibitions': return <Image className="h-4 w-4" />;
      case 'articles': return <FileText className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const titles: Record<string, string> = {
    users: 'User Activity',
    jobs: 'Job Activity',
    competitions: 'Competition Activity',
    exhibitions: 'Exhibition Activity',
    articles: 'Article Activity'
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-gray-500">Monitor and manage platform activity across all sections</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select management section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="users"><Users className="h-4 w-4 inline" /> Manage Users</SelectItem>
                <SelectItem value="jobs"><Briefcase className="h-4 w-4 inline" /> Manage Jobs</SelectItem>
                <SelectItem value="competitions"><Trophy className="h-4 w-4 inline" /> Manage Competitions</SelectItem>
                <SelectItem value="exhibitions"><Image className="h-4 w-4 inline" /> Manage Exhibitions</SelectItem>
                <SelectItem value="articles"><FileText className="h-4 w-4 inline" /> Manage Articles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <DataSkeleton />
        ) : (
          <>
            <ActivityStatsCards
              stats={stats}
              additionalInfo={additionalInfo[selectedType]}
              selectedType={selectedType}
              getIcon={getIcon}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ActivityChart
                chartType={chartType}
                setChartType={setChartType}
                selectedType={selectedType}
                processedData={processedData[selectedType]}
                title={titles[selectedType]}
                color={COLORS[selectedType]}
              />
              <DistributionPie distributionData={distributionData} />
            </div>

            <RecentOverview
              titles={titles}
              processedData={processedData}
              getIcon={getIcon}
              colors={COLORS}
            />
          </>
        )}
      </div>
    </div>
  );
}
