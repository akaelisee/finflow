import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '../api/analyticsApi';

export function useAnalytics(month: string) {
  const kpis = useQuery({
    queryKey: ['analytics', 'kpis', month],
    queryFn: () => analyticsApi.kpis(month),
  });
  const byCategory = useQuery({
    queryKey: ['analytics', 'by-category', month],
    queryFn: () => analyticsApi.byCategory(month),
  });
  const monthly = useQuery({
    queryKey: ['analytics', 'monthly'],
    queryFn: () => analyticsApi.monthly(),
  });

  return { kpis, byCategory, monthly };
}
