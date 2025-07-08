import { useState, useEffect, useCallback } from 'react';

export type LeaveRequestStatuses = 'pending' | 'approved' | 'rejected' | 'all';

export interface LeaveRequests {
  id: string;
  name: string;
  type_of_leave: string;
  date_from: string;
  date_to: string;
  status: string;
  reason: string;
  createdAt: string;
  [key: string]: any;
}

const useLeaveRequestsApi = (url?: string) => {
  const [data, setData] = useState<LeaveRequests[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + (url ?? ''));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const handleChangeStatus = useCallback((status: LeaveRequestStatuses, id: string) => {
    setData((prevData) => {
      if (!prevData) return [];
      const updatedData = prevData.map((request) => {
        if (request.id === id) {
          return { ...request, status: status.toUpperCase() };
        }
        return request;
      });
      return updatedData;
    })
  }, [setData]);

  return { data, error, loading, handleChangeStatus };
}

export default useLeaveRequestsApi;