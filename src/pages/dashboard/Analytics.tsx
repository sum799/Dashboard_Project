import Grid from '@mui/material/Grid';
import {
  analyticKPIs,
  topCampaignsChartData,
  userByCountryData,
  userEngagementChartData,
} from 'data/dashboard';
import { getStoredAuthUser } from 'lib/googleAuth';
import ProPlanCTA from 'components/sections/dashboards/analytics/cta/ProPlanCTA';
import AnalyticKPI from 'components/sections/dashboards/analytics/kpi/AnalyticKPI';
import TopCampaigns from 'components/sections/dashboards/analytics/top-campaigns/TopCampaigns';
import UserByCountry from 'components/sections/dashboards/analytics/user-by-country/UserByCountry';
import UserEngagement from 'components/sections/dashboards/analytics/user-engagement/UserEngagement';

const Analytics = () => {
  const isAuthenticated = !!getStoredAuthUser();

  const postLoginKPIs = [
    {
      title: 'Your Current Investment',
      value: '$1,24,500',
      icon: {
        name: 'material-symbols:account-balance-wallet-rounded',
        color: 'primary',
      },
      link: {
        prefix: 'View details',
        text: 'Portfolio',
        url: '#!',
      },
    },
    {
      title: 'Next Payment',
      value: '$18,500',
      icon: {
        name: 'material-symbols:payments-outline-rounded',
        color: 'warning',
      },
      link: {
        prefix: 'Due date',
        text: '12 Sep',
        url: '#!',
      },
    },
    {
      title: 'Months left to Pay',
      value: '8',
      icon: {
        name: 'material-symbols:calendar-month-outline-rounded',
        color: 'success',
      },
      link: {
        prefix: 'Schedule',
        text: 'Installments',
        url: '#!',
      },
    },
    {
      title: 'Late Payments',
      value: '3',
      icon: {
        name: 'material-symbols:warning-outline-rounded',
        color: 'error',
      },
      link: {
        prefix: 'Action needed',
        text: 'Follow up',
        url: '#!',
      },
    },
  ];

  const visibleKPIs = isAuthenticated ? postLoginKPIs : analyticKPIs;

  return (
    <Grid container>
      <Grid size={{ xs: 12, xl: 5 }} container>
        {visibleKPIs.map((kpi) => (
          <Grid key={kpi.title} size={{ xs: 6, md: 3, xl: 6 }}>
            <AnalyticKPI kpi={kpi} />
          </Grid>
        ))}
      </Grid>

      <Grid size={{ xs: 12, lg: 7 }}>
        <UserEngagement data={userEngagementChartData} />
      </Grid>

      <Grid size={{ xs: 12, lg: 5 }}>
        <TopCampaigns data={topCampaignsChartData} />
      </Grid>

      {!isAuthenticated && (
        <Grid size={{ xs: 12, xl: 7 }}>
          <UserByCountry data={userByCountryData} />
        </Grid>
      )}
      <Grid size={12}>
        <ProPlanCTA />
      </Grid>
    </Grid>
  );
};

export default Analytics;
