"use client";
import { useEffect, useState } from 'react';

import useLeaveRequestsApi, { LeaveRequests } from '@/hooks/useLeaveRequestsApi';

import RequestsTable from './RequestsTable';
import RequestsFilter from './RequestsFilter';
import { LeaveRequestFilters } from '../constants/filters';

const filterOptions = [
  { name: LeaveRequestFilters.TYPE_OF_LEAVE, value: 'all' },
  { name: LeaveRequestFilters.STATUS, value: 'all' },
  { name: LeaveRequestFilters.CREATED_AT, value: 'asc' }
];

export default function Requests() {
  const { data: leaveRequests, error, loading, handleChangeStatus } = useLeaveRequestsApi();

  const [filters, setFilters] = useState([
    { name: LeaveRequestFilters.STATUS, value: 'all' },
    { name: LeaveRequestFilters.TYPE_OF_LEAVE, value: 'all' },
    { name: LeaveRequestFilters.CREATED_AT, value: 'descendant' }
  ]);
  const [filteredData, setFilteredData] = useState<LeaveRequests[]>([]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.detail;
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.name === name ? { ...filter, value } : filter
      )
    );
  };

  const applyFilters = () => {
    let filtered = leaveRequests;
    filters.forEach((filter) => {
      if (filter.name === LeaveRequestFilters.CREATED_AT) {
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return filter.value === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
      }
      else {
        filtered = filtered.filter((request) => {
          if (filter.value === 'all') return true;
          if (filter.name === LeaveRequestFilters.TYPE_OF_LEAVE && filter.value === 'other') return ['vacation', 'sick', 'personal'].includes(request.type_of_leave.toLowerCase()) === false;
          return request[filter.name].toLowerCase().includes(filter.value.toLowerCase())
        }
        );
      }
    });

    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setFilters(filterOptions);
    setFilteredData(leaveRequests!);
  };

  useEffect(() => {
    if (leaveRequests) {
      setFilteredData(leaveRequests);
      applyFilters();
    }
  }, [leaveRequests]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] w-full min-h-screen p-8 pb-10 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <div className="w-full border border-gray-200 p-6 rounded-lg bg-white">
          <p className="text-lg text-gray-600">
            The application fetches data from an API and displays it in a table format.
          </p>

          <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            {
              error ? (
                <div className="text-red-500 text-center p-8">
                  <p>Error: {error}</p>
                </div>
              ) : (
                <>
                  {/* Requests Filter */}
                  <RequestsFilter
                    filters={filters}
                    handleClearFilters={handleClearFilters}
                    handleFilterChange={handleFilterChange}
                    applyFilters={applyFilters}
                  />

                  {/* Requests Table */}
                  <RequestsTable
                    loading={loading}
                    data={filteredData}
                    handleChangeStatus={handleChangeStatus}
                  />
                </>
              )
            }
          </div>

        </div>
      </main>
    </div>
  );
}