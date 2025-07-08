const mockData = [
  {
    id: '1',
    name: 'John Doe',
    type_of_leave: 'vacation',
    date_from: '2024-01-01',
    date_to: '2024-01-05',
    status: 'approved',
    reason: 'Going to the beach',
    createdAt: '2023-12-15',
  },
];

export type LeaveRequestStatuses = 'pending' | 'approved' | 'rejected' | 'all';

export interface LeaveRequests {
  id: string;
  name: string;
  type_of_leave: LeaveRequestStatuses;
  date_from: string;
  date_to: string;
  status: string;
  reason: string;
  createdAt: string;
  [key: string]: any;
}

const useLeaveRequestsApi = () => ({
  data: mockData,
  error: null,
  loading: false,
  handleChangeStatus: jest.fn((status: LeaveRequestStatuses, id: string) => {
    const request = mockData.find(req => req.id === id)
    if (request) {
      request.status = status;
    }
  }),
});

export default useLeaveRequestsApi;
