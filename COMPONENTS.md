# HOMA-NATURALS Component Documentation

Complete guide to all reusable components in the application.

## Table of Contents
1. [Layout Components](#layout-components)
2. [Button & Action](#button--action)
3. [Forms & Input](#forms--input)
4. [Data Display](#data-display)
5. [Feedback](#feedback)
6. [Cards & Containers](#cards--containers)
7. [Charts](#charts)

---

## Layout Components

### Navbar
Top navigation bar with business name, notifications, and user profile.

```jsx
import { Navbar } from '@/components'

<Navbar onMenuToggle={() => setOpen(!open)} />
```

**Props:**
- `onMenuToggle`: Function to toggle sidebar

### Sidebar
Navigation menu with all routes.

```jsx
import { Sidebar } from '@/components'

<Sidebar isOpen={true} onClose={() => {}} />
```

**Props:**
- `isOpen`: Boolean to control visibility
- `onClose`: Function called when closing

---

## Button & Action

### Button
Versatile button component with multiple variants.

```jsx
import { Button } from '@/components'

// Primary button
<Button variant="primary" size="md">
  Click me
</Button>

// Secondary button
<Button variant="secondary">Secondary</Button>

// Danger button
<Button variant="danger">Delete</Button>

// Outline button
<Button variant="outline">Outline</Button>

// Ghost button
<Button variant="ghost">Ghost</Button>

// Loading state
<Button loading>Saving...</Button>

// Disabled
<Button disabled>Disabled</Button>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `loading`: Boolean
- `disabled`: Boolean
- `className`: Custom CSS classes
- `onClick`: Click handler

---

## Forms & Input

### Input
Form input with validation support.

```jsx
import { Input } from '@/components'

<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  helpText="Must be valid email"
/>
```

**Props:**
- `label`: Input label
- `type`: HTML input type
- `placeholder`: Placeholder text
- `value`: Current value
- `onChange`: Change handler
- `error`: Error message (shows red border)
- `helpText`: Helper text below input
- `icon`: Lucide icon component

### SearchBox
Search input with clear button.

```jsx
import { SearchBox } from '@/components'

<SearchBox
  placeholder="Search shops..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  clearable={true}
/>
```

### FilterDropdown
Dropdown for filtering.

```jsx
import { FilterDropdown } from '@/components'

<FilterDropdown
  label="Payment Status"
  options={[
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' }
  ]}
  value={filter}
  onChange={setFilter}
/>
```

---

## Data Display

### Table
Generic data table component.

```jsx
import { Table } from '@/components'

const columns = [
  { key: 'name', label: 'Name', width: '20%' },
  { key: 'email', label: 'Email', width: '30%' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => <StatusBadge status={value} />
  }
]

const rowActions = [
  {
    icon: <Edit />,
    onClick: (row) => console.log(row),
    className: 'p-2 hover:bg-blue-100'
  }
]

<Table columns={columns} data={items} rowActions={rowActions} />
```

### Pagination
Pagination controls.

```jsx
import { Pagination } from '@/components'

<Pagination
  currentPage={1}
  totalPages={10}
  totalItems={100}
  itemsPerPage={10}
  onPageChange={setPage}
/>
```

### StatusBadge
Status indicator badge.

```jsx
import { StatusBadge } from '@/components'

// Payment status
<StatusBadge status="Paid" variant="payment" />

// Active status
<StatusBadge status="Active" variant="active" />

// Transaction status
<StatusBadge status="Pending" variant="transaction" />
```

### ProgressBar
Progress indicator.

```jsx
import { ProgressBar } from '@/components'

<ProgressBar
  value={75}
  max={100}
  label="Done"
  color="green"
  size="md"
/>
```

---

## Feedback

### Toast
Toast notifications (see ToastContainer for usage).

```jsx
import { Toast } from '@/components'

<Toast
  message="Changes saved!"
  type="success"
  duration={3000}
  onClose={() => {}}
/>
```

**Types:** 'success' | 'error' | 'warning' | 'info'

### Alert
Alert messages.

```jsx
import { Alert } from '@/components'

<Alert
  type="warning"
  title="Low Stock"
  description="Only 2 items left"
  dismissible={true}
  onDismiss={() => {}}
/>
```

### Modal
Dialog/Modal component.

```jsx
import { Modal } from '@/components'

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure?</p>
</Modal>
```

**Props:**
- `isOpen`: Boolean
- `onClose`: Close handler
- `title`: Modal title
- `children`: Modal content
- `footer`: Footer JSX
- `size`: 'sm' | 'md' | 'lg' | 'xl'

### EmptyState
Empty state placeholder.

```jsx
import { EmptyState } from '@/components'

<EmptyState
  icon={ShoppingBag}
  title="No items"
  description="Create your first item"
  action={<Button>Create Item</Button>}
/>
```

---

## Cards & Containers

### Card
Generic card container.

```jsx
import { Card } from '@/components'

<Card variant="default">
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

**Variants:** 'default' | 'compact' | 'elevated' | 'bordered' | 'gradient'

### StatCard
Statistics card.

```jsx
import { StatCard } from '@/components'

<StatCard
  title="Monthly Sales"
  value="₹2,45,000"
  percentage="+12.5%"
  trend="up"
  icon="TrendingUp"
/>
```

### SummaryCard
Summary metric card.

```jsx
import { SummaryCard } from '@/components'

<SummaryCard
  label="Total Sales"
  value="₹1,85,000"
  subtext="24 orders"
  color="green"
/>
```

### InventoryCard
Inventory item card with stock visualization.

```jsx
import { InventoryCard } from '@/components'

<InventoryCard
  product={{
    productName: 'Powder Jaggery',
    quantity: 500,
    stock: 'In Stock'
  }}
/>
```

---

## Charts

### RevenueChart
Bar chart for revenue.

```jsx
import { RevenueChart } from '@/components'

<RevenueChart data={monthlyData} />
```

### PaymentStatusChart
Pie chart for payment distribution.

```jsx
import { PaymentStatusChart } from '@/components'

<PaymentStatusChart data={paymentData} />
```

### MonthlySalesChart
Line chart for sales trends.

```jsx
import { MonthlySalesChart } from '@/components'

<MonthlySalesChart data={salesTrendData} />
```

---

## Custom Hooks

### useSearch
Manage search state.

```jsx
const { searchQuery, setSearchQuery, clearSearch } = useSearch('')
```

### usePagination
Manage pagination.

```jsx
const {
  currentPage,
  totalPages,
  currentItems,
  goToPage,
  nextPage,
  prevPage
} = usePagination(items, 10)
```

### useModal
Manage modal state.

```jsx
const { isOpen, open, close, toggle } = useModal(false)
```

### useForm
Manage form state.

```jsx
const { values, errors, handleChange, handleSubmit } = useForm(
  { email: '' },
  (values) => console.log(values)
)
```

### useToast
Toast notifications.

```jsx
const { success, error, warning, info } = useToast()

success('Saved!')
error('Error occurred')
warning('Take care!')
info('FYI...')
```

---

## Utility Functions

### formatCurrency
Format numbers as currency.

```jsx
import { formatCurrency } from '@/utils/helpers'

formatCurrency(50000) // ₹50,000
```

### formatDate
Format dates.

```jsx
import { formatDate } from '@/utils/helpers'

formatDate('2024-05-15', 'short') // 15/05/2024
formatDate('2024-05-15', 'long')  // 15 May 2024
```

### parseC urrency
Extract number from currency string.

```jsx
import { parseCurrency } from '@/utils/helpers'

parseCurrency('₹50,000') // 50000
```

---

## Best Practices

1. **Always use semantic HTML** - Use proper button, input, and label elements
2. **Accessibility** - Include alt text, ARIA labels, and keyboard navigation
3. **Responsiveness** - Test on mobile, tablet, and desktop
4. **Error Handling** - Show user-friendly error messages
5. **Loading States** - Display loading indicators for async operations
6. **Validation** - Validate user input on both client and server

---

## Component Composition Example

```jsx
import { 
  Card, Button, Input, Table, Pagination, 
  SearchBox, FilterDropdown, StatusBadge 
} from '@/components'

export default function ShopsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex gap-4">
          <SearchBox value={search} onChange={(e) => setSearch(e.target.value)} />
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
      </Card>

      <Card>
        <Table columns={columns} data={filteredData} />
        <Pagination currentPage={page} onPageChange={setPage} />
      </Card>

      <Button onClick={() => {}}>Add Shop</Button>
    </div>
  )
}
```

---

**Last Updated**: May 2026  
**Version**: 1.0.0
