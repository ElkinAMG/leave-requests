import { LeaveRequests, LeaveRequestStatuses } from "@/hooks/useLeaveRequestsApi";
import {
  AnalyticalTable,
  AnalyticalTableColumnDefinition,
  Button,
  ButtonDomRef,
  Menu,
  MenuDomRef,
  MenuItem,
  Popover,
  PopoverDomRef,
  Tag,
  Text,
  Title,
  Toast,
  ToastDomRef
} from "@ui5/webcomponents-react";
import { useMemo, useRef } from "react";

type RequestTableProps = {
  loading: boolean;
  data: LeaveRequests[];
  handleChangeStatus: (status: LeaveRequestStatuses, id: string) => void;
}

export default function RequestsTable({ loading, data, handleChangeStatus }: RequestTableProps) {
  const RequestsColumns: AnalyticalTableColumnDefinition[] = useMemo(() => [
    {
      Header: () => <div className="text-center">ID</div>,
      accessor: 'id',
      width: 80,
      disableResizing: true,
      Cell: ({ value }: any) => <div className="text-center">{value}</div>,
    },
    {
      Header: () => <div className="text-center">Name</div>,
      accessor: 'name',
      width: 230,
      Cell: ({ value }: any) => <div className="text-center">{value}</div>,
    },
    {
      Header: () => <div className="text-center">Type of Leave</div>,
      accessor: 'type_of_leave',
      width: 180,
      disableResizing: true,
      Cell: ({ value }: any) => {
        const typeColors: Record<string, string> = {
          sick: 'Negative',
          vacation: 'Positive',
          personal: 'Information',
          other: 'Critical'
        };

        return (
          <div style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <Tag
              design={typeColors[value.toLowerCase()] as any || 'Set1'}
              colorScheme="6"
              hideStateIcon
            >
              {value}
            </Tag>
          </div>
        );
      },
    },
    {
      Header: () => <div className="text-center">Date From</div>,
      accessor: 'date_from',
      width: 120,
      Cell: ({ value }: any) => (
        <div className="text-center">
          {new Date(value).toLocaleDateString('en-US')}
        </div>
      ),
    },
    {
      Header: () => <div className="text-center">Date To</div>,
      accessor: 'date_to',
      width: 120,
      Cell: ({ value }: any) => (
        <div className="text-center">
          {new Date(value).toLocaleDateString('en-US')}
        </div>
      ),
    },
    {
      Header: () => <div className="text-center">Status</div>,
      accessor: 'status',
      width: 150,
      Cell: ({ value }: any) => {
        const statusColors: Record<string, string> = {
          pending: 'Neutral',
          approved: 'Positive',
          rejected: 'Negative'
        };

        return (
          <div className="text-center">
            <Tag
              design={statusColors[value.toLowerCase()] as any || 'Set1'}
              colorScheme="10"
            >
              {value}
            </Tag>
          </div>
        );
      },
    },
    {
      Header: () => <div className="text-center">Reason</div>,
      accessor: 'reason',
      Cell: ({ value }: any) => {
        const popoverRef = useRef<PopoverDomRef>(null);
        const anchorRef = useRef<HTMLDivElement>(null);

        const handleOpenPopover = () => {
          if (popoverRef.current) {
            popoverRef.current.opener = anchorRef.current as any;
            popoverRef.current.open = true;
          }
        };
        return (
          <div
            className='text-center text-gray-600'
            ref={anchorRef}
          >

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                wordBreak: 'break-word',
              }}
            >
              <Text>
                {value.length > 70 ? `${value.slice(0, 70)}...` : value}
              </Text>
              {
                value.length > 70 && (
                  <Title
                    onClick={handleOpenPopover}
                    className='cursor-pointer color-blue-500 underline hover:text-blue-600 text-sm'
                  >
                    Click to see full reason
                  </Title>
                )
              }
            </div>

            <Popover
              ref={popoverRef}
              headerText="Reason"
              placement='Bottom'
            >
              <div
                className='text-left p-4 bg-white rounded-lg shadow-lg max-w-[300px] break-words whitespace-pre-wrap text-left'
              >
                {value}
              </div>
            </Popover>
          </div>
        )
      },
    },
    {
      Header: () => <div className='text-center'>Requested At</div>,
      accessor: 'createdAt',
      width: 100,
      Cell: ({ value }: any) => (
        <div className='text-center'>
          {new Date(value).toLocaleDateString('en-US')}
        </div>
      ),
    },
    {
      Header: () => <div className='text-center'>Actions</div>,
      accessor: 'actions',
      width: 120,
      disableResizing: true,
      Cell: (props: any) => {
        const anchorRef = useRef<ButtonDomRef>(null);
        const menuRef = useRef<MenuDomRef>(null);
        const toastRef = useRef<ToastDomRef>(null);
        const handleOpenActions = () => {
          if (anchorRef.current) {
            menuRef.current!.opener = anchorRef.current as any;
            menuRef.current!.open = true;

            if (toastRef.current) {
              toastRef.current.open = false;
            }

          }
        }
        return (
          <div className='w-full flex justify-center items-center'>
            <Button
              design='Emphasized'
              className='w-6 h-6 p-0'
              onClick={handleOpenActions}
              endIcon='overflow'
              ref={anchorRef}
            />
            <Menu
              ref={menuRef}
              data-testid={`mock-Menu-${props.row.original.id}`}
              onItemClick={(e: any) => {
                const action = e.detail.text?.trim();
                if (action === 'Approve') {
                  handleChangeStatus('approved', props.row.original.id);
                } else if (action === 'Reject') {
                  handleChangeStatus('rejected', props.row.original.id);
                }

                if (menuRef.current) {
                  menuRef.current.open = false;
                  toastRef.current!.open = true;
                }

              }}>
              <MenuItem text="Approve" icon="accept" className="font-bold text-sm" />
              <MenuItem text="Reject" icon="decline" className='font-bold text-sm' />
            </Menu>
            <Toast
              id="toast"
              placement="TopCenter"
              className="font-[family-name:var(--font-geist-sans)]"
              style={{
                backgroundColor: 'var(--sapContent_IllustrativeBackground)',
                color: 'var(--sapContent_IllustrativeTextColor)',
                border: '1px solid var(--sapContent_IllustrativeBorderColor)',
                borderRadius: '8px',
                padding: '8px 16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              ref={toastRef}
            >
              Request {props.row.original.id} has been {props.row.original.status.toLowerCase()}.
            </Toast>
          </div>
        )
      },
    }
  ] as AnalyticalTableColumnDefinition[], []);

  return (<AnalyticalTable
    columns={RequestsColumns}
    data={data || []}
    loading={loading}
    noDataText="No data available"
    rowHeight={40}
    loadingDelay={500}
    visibleRows={10}
    className='w-full'
  />)
}