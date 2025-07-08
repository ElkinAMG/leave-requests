import { render, screen, fireEvent } from '@testing-library/react';
import RequestsTable from '@/components/Requests/RequestsTable';

import useLeaveRequestsApi from '@/__mocks__/useLeaveRequestsApi';

describe('RequestsTable', () => {

  const { data, handleChangeStatus } = useLeaveRequestsApi();

  beforeEach(() => jest.clearAllMocks());

  it('renders AnalyticalTable with data', () => {
    render(<RequestsTable loading={false} data={data} handleChangeStatus={handleChangeStatus} />);
    expect(screen.getByTestId('mock-AnalyticalTable')).toBeInTheDocument();
  });

  it('checks states changes after approve button is clicked', () => {
    render(<RequestsTable loading={false} data={data} handleChangeStatus={handleChangeStatus} />);

    const actionButton = screen.getAllByTestId('mock-Button')[0];
    fireEvent.click(actionButton as HTMLElement);

    const menu = screen.getByTestId('mock-Menu-1');
    fireEvent.click(menu);

    const approveItem = screen.getByTestId('mock-MenuItem-Approve');
    fireEvent.click(approveItem);

    expect(data.find(req => req.id === '1')?.status).toBe('approved');
  });
});
