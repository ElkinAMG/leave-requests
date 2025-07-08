import { render, screen } from '@testing-library/react';
import Requests from '@/components/Requests/index';

jest.mock('@/hooks/useLeaveRequestsApi', () => () => ({
  data: [
    {
      id: '1',
      name: 'Test User',
      type_of_leave: 'personal',
      date_from: '2024-06-01',
      date_to: '2024-06-05',
      status: 'approved',
      reason: 'Personal matters',
      createdAt: '2024-05-20'
    }
  ],
  error: null,
  loading: false,
  handleChangeStatus: jest.fn()
}));

describe('Requests page', () => {
  it('renders title and data table', async () => {
    render(<Requests />);

    expect(await screen.findByText('Leave Requests')).toBeInTheDocument();
    expect(screen.getByTestId('mock-AnalyticalTable')).toBeInTheDocument();
  });
});
