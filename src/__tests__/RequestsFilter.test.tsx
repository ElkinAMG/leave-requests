import { render, screen, fireEvent } from '@testing-library/react';
import RequestsFilter from '@/components/Requests/RequestsFilter';

import { LeaveRequestFilters } from '@/components/constants/filters';

describe('RequestsFilter', () => {
  const filters = [
    { name: LeaveRequestFilters.STATUS, value: 'pending' },
    { name: LeaveRequestFilters.TYPE_OF_LEAVE, value: 'vacation' },
    { name: LeaveRequestFilters.CREATED_AT, value: 'asc' }
  ];

  const mockApplyFilters = jest.fn(() => {
    filters.forEach(filter => {
      filter.value = filter.value;
    });
  });
  const mockClearFilters = jest.fn(() => {
    filters.forEach(filter => {
      filter.value = '';
    });
    mockApplyFilters();
  });
  const mockHandleFilterChange = jest.fn((e: { detail: { name: string, value: string } }) => {
    filters.forEach(filter => {
      if (filter.name === e.detail.name) {
        filter.value = e.detail.value;
      }
    })
  });

  beforeEach(() => jest.clearAllMocks());

  it('renders all filter components', () => {
    render(
      <RequestsFilter
        filters={filters}
        applyFilters={mockApplyFilters}
        handleClearFilters={mockClearFilters}
        handleFilterChange={mockHandleFilterChange}
      />
    );

    expect(screen.getByTestId('mock-FilterBar')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-Select')).toHaveLength(2);
    expect(screen.getByTestId('mock-SegmentedButton')).toBeInTheDocument();
  });

  it('calls applyFilters when FilterBar is clicked', () => {
    render(
      <RequestsFilter
        filters={filters}
        applyFilters={mockApplyFilters}
        handleClearFilters={mockClearFilters}
        handleFilterChange={mockHandleFilterChange}
      />
    );

    fireEvent.click(screen.getByTestId('mock-FilterBar'));
    expect(mockApplyFilters).toHaveBeenCalled();
  });

  it('filters change on handleFilterChange is clicked', () => {
    render(
      <RequestsFilter
        filters={filters}
        applyFilters={mockApplyFilters}
        handleClearFilters={mockClearFilters}
        handleFilterChange={mockHandleFilterChange}
      />
    );

    fireEvent.change(screen.getAllByTestId('mock-Select')[0], {
      target: { value: 'approved' }
    });

    expect(filters.find(f => f.name === LeaveRequestFilters.STATUS)?.value).toBe('approved');
  });
});
