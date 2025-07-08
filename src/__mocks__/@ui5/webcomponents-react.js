const React = require('react');

const createMockComponent = (name) => {
  return React.forwardRef((props, ref) => {
    const {
      children,
      onClick,
      onChange,
      onGo,
      onItemClick,
      onSelectionChange,
      ...rest
    } = props;

    const handleEvent = (e) => {
      onClick?.(e);
      onChange?.(e);
      onItemClick?.(e);
      onGo?.(e);
      onSelectionChange?.(e);
    };

    return (
      <div
        data-testid={`mock-${name}`}
        ref={ref}
        onClick={handleEvent}
        onChange={handleEvent}
        onItemClick={handleEvent}
        onSelectionChange={handleEvent}
        {...rest}
      >
        {children}
      </div>
    );
  });
};

const Select = ({ onChange, children, ...props }) => (
  <select data-testid="mock-Select" onChange={onChange} {...props}>
    {children}
  </select>
);

const Option = ({ value, children, ...props }) => (
  <option value={value} {...props}>
    {children}
  </option>
);

const Button = React.forwardRef(({ onClick, children, ...rest }, ref) => (
  <button
    data-testid="mock-Button"
    onClick={onClick}
    ref={ref}
    {...rest}
  >
    {children || 'Mocked UI5 Button'}
  </button>
));

const AnalyticalTable = ({ columns, data = [] }) => {
  return (
    <table data-testid="mock-AnalyticalTable">
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{typeof col.Header === 'function' ? col.Header() : col.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={row.id || rowIndex}>
            {columns.map((col, colIndex) => {
              const cellValue = row[col.accessor];
              const cell = col.Cell
                ? col.Cell({ value: cellValue, row: { original: row } })
                : cellValue;

              return (
                <td key={colIndex}>
                  {React.isValidElement(cell) ? cell : <span>{cell}</span>}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Menu = React.forwardRef(({ children, onItemClick, ...rest }, ref) => {
  return (<div ref={ref} {...rest}>
    {React.Children.map(children, child =>
      React.cloneElement(child, {
        onClick: () =>
          onItemClick?.({ detail: { text: child.props.text } })
      })
    )}
  </div>)
})

const MenuItem = ({ text, ...rest }) => (
  <button data-testid={`mock-MenuItem-${text}`} {...rest}>
    {text}
  </button>
);

module.exports = {
  __esModule: true,

  // Smart mocks
  Button,
  Select,
  Option,
  AnalyticalTable,
  Menu,
  MenuItem,

  // Mocked as functional but testable containers
  FilterBar: createMockComponent('FilterBar'),
  FilterGroupItem: createMockComponent('FilterGroupItem'),
  SegmentedButton: createMockComponent('SegmentedButton'),
  SegmentedButtonItem: createMockComponent('SegmentedButtonItem'),
  Popover: createMockComponent('Popover'),
  Tag: createMockComponent('Tag'),
  Text: createMockComponent('Text'),
  Title: createMockComponent('Title'),
  Toast: createMockComponent('Toast'),

  // Non-rendering values
  AnalyticalTableColumnDefinition: {},
  ButtonDomRef: {},
  MenuDomRef: {},
  PopoverDomRef: {},
  ToastDomRef: {},
};
