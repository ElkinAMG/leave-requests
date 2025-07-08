import { FilterBar, FilterGroupItem, Option, SegmentedButton, SegmentedButtonItem, Select, Tag } from "@ui5/webcomponents-react";
import { LeaveRequestFilters } from "../constants/filters";

type RequestsFilterProps = {
  filters: {
    name: LeaveRequestFilters;
    value: string;
  }[];
  applyFilters: () => void;
  handleClearFilters: () => void;
  handleFilterChange: (e: any) => void;
};

export default function RequestsFilter({ filters, applyFilters, handleClearFilters, handleFilterChange }: RequestsFilterProps) {
  return (
    <FilterBar
      filterContainerWidth="100%"
      onGo={applyFilters}
      onClear={handleClearFilters}
      className="w-full mb-4 p-4 rounded-lg border"
      style={{
        background: 'var(--sapGroup_ContentBackground)',
        borderColor: 'var(--sapList_BorderColor)'
      }}
      showGoOnFB
      showResetButton
      showClearOnFB
      hideFilterConfiguration
    >
      <div
        className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]"
      >
        {/* Filter by Status */}
        <FilterGroupItem
          label="Status"
          groupName="filters"
          filterKey="status"
        >
          <Select
            name="status"
            onChange={(e: any) =>
              handleFilterChange({
                detail: { name: LeaveRequestFilters.STATUS, value: e.target.value },
              })
            }
            value={filters?.find(f => f.name === LeaveRequestFilters.STATUS)?.value || 'all'}
          >
            <Option value="all" selected>
              <Tag design="Set1" colorScheme="6">All</Tag>
            </Option>
            <Option value="pending">
              <Tag design="Neutral" colorScheme="6">Pending</Tag>
            </Option>
            <Option value="approved">
              <Tag design="Positive" colorScheme="6">Approved</Tag>
            </Option>
            <Option value="rejected">
              <Tag design="Negative" colorScheme="6">Rejected</Tag>
            </Option>
          </Select>
        </FilterGroupItem>

        {/* Order by Date Requested */}
        <FilterGroupItem
          label="Date Requested"
          groupName="filters"
          filterKey="created_at"
        >
          <SegmentedButton
            onSelectionChange={(e: any) => {
              handleFilterChange({
                detail: {
                  name: LeaveRequestFilters.CREATED_AT,
                  value: e.detail.selectedItems[0].textContent?.trim() === 'Ascendant' ? 'asc' : 'desc',
                },
              })
            }
            }

          >
            <SegmentedButtonItem
              icon='sort-ascending'
              selected={filters?.find(f => f.name === LeaveRequestFilters.CREATED_AT)?.value === 'asc' ? true : false}
            >
              Ascendant
            </SegmentedButtonItem>
            <SegmentedButtonItem
              icon='sort-descending'
              selected={filters?.find(f => f.name === LeaveRequestFilters.CREATED_AT)?.value === 'desc' ? true : false}
            >
              Descendant
            </SegmentedButtonItem>
          </SegmentedButton>
        </FilterGroupItem>

        {/* Filter by Type of Leave */}
        <FilterGroupItem
          label="Type of Leave"
          groupName="filters"
          filterKey="type_of_leave"
        >
          <Select
            name={LeaveRequestFilters.TYPE_OF_LEAVE}
            onChange={(e: any) =>
              handleFilterChange({
                detail: { name: LeaveRequestFilters.TYPE_OF_LEAVE, value: e.target.value },
              })
            }
            value={filters?.find(f => f.name === LeaveRequestFilters.TYPE_OF_LEAVE)?.value || 'all'}
          >
            <Option selected value="all">All</Option>
            <Option value="vacation">Vacation</Option>
            <Option value="sick">Sick</Option>
            <Option value="personal">Personal</Option>
            <Option value="other">Other</Option>
          </Select>
        </FilterGroupItem>
      </div>
    </FilterBar>
  )
}