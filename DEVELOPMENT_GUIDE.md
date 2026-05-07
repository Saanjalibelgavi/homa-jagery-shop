# HOMA-NATURALS Development Guide

## 🎯 Quick Reference

### Project Structure at a Glance

```
src/
├── App.jsx                 # Main router with all routes
├── main.jsx               # React entry point
├── index.css              # Global styles & Tailwind layer
│
├── components/            # 25+ Reusable components
│   ├── index.js          # Central exports (import { Button } from '@/components')
│   ├── Navbar.jsx        # Top navigation
│   ├── Sidebar.jsx       # Left sidebar menu
│   ├── Button.jsx        # Button component (5 variants)
│   ├── Modal.jsx         # Modal dialog
│   ├── Input.jsx         # Form input
│   ├── Card.jsx          # Card wrapper (5 variants)
│   ├── Alert.jsx         # Alert messages
│   ├── Toast.jsx         # Toast notifications
│   ├── Skeleton.jsx      # Loading skeletons
│   ├── Table.jsx         # Generic table
│   ├── Pagination.jsx    # Pagination controls
│   ├── SearchBox.jsx     # Search input
│   ├── FilterDropdown.jsx # Filter dropdown
│   ├── StatusBadge.jsx   # Status indicators
│   ├── ProgressBar.jsx   # Progress visualization
│   ├── InventoryCard.jsx # Inventory card
│   ├── EmptyState.jsx    # Empty state placeholder
│   ├── StatCard.jsx      # Stat card with trends
│   ├── SummaryCard.jsx   # Summary metric card
│   ├── RevenueChart.jsx  # Bar chart
│   ├── PaymentStatusChart.jsx # Pie chart
│   ├── MonthlySalesChart.jsx  # Line chart
│   └── ... + more
│
├── pages/                 # 7 Main pages
│   ├── Dashboard.jsx      # Main dashboard
│   ├── Shops.jsx         # Shops list
│   ├── ShopDetails.jsx   # Shop profile
│   ├── Transactions.jsx  # Transaction list
│   ├── Inventory.jsx     # Inventory tracking
│   ├── Reports.jsx       # Analytics dashboard
│   └── Settings.jsx      # Configuration
│
├── layouts/
│   └── Layout.jsx        # Main layout wrapper
│
├── data/
│   └── dummy.js          # All static data
│
├── hooks/
│   └── useHooks.js       # 8 Custom hooks
│
├── utils/
│   └── helpers.js        # 15+ Utility functions
```

---

## 🔧 Common Tasks

### Navigate to a Page
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/shops');           // Go to shops
navigate(`/shops/${id}`);    // Go to shop details
```

### Use a Component
```jsx
import { Button, Modal, Input } from '@/components';

// Button with variants
<Button variant="primary">Click Me</Button>
<Button variant="secondary" size="sm">Small</Button>
<Button variant="danger" loading={isLoading}>Delete</Button>

// Modal
const { isOpen, open, close } = useModal();
<Button onClick={open}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={close} title="Title">
  Content here
</Modal>

// Input
<Input 
  label="Email" 
  placeholder="Enter email"
  error="Invalid email"
  required
/>
```

### Use a Custom Hook
```jsx
import { useSearch, usePagination, useFilter } from '@/hooks/useHooks';

// Search
const { searchQuery, setSearchQuery, clearSearch } = useSearch();

// Pagination
const { currentPage, currentItems, goToPage, totalPages } = usePagination(items, 10);

// Filter
const { filters, updateFilter, filteredItems } = useFilter(items, {
  status: 'active'
});
```

### Use a Utility Function
```jsx
import { 
  formatCurrency, 
  formatDate, 
  validateEmail,
  calculateGrowth 
} from '@/utils/helpers';

const price = formatCurrency(50000);        // ₹50,000
const date = formatDate('2024-01-15');      // Jan 15, 2024
const valid = validateEmail('test@example.com');  // true
const growth = calculateGrowth(100, 90);    // 11.11%
```

### Add a New Component
```jsx
// 1. Create file in src/components/MyComponent.jsx
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div className="p-4 bg-white rounded-lg">
      {prop1} - {prop2}
    </div>
  );
};

export default MyComponent;

// 2. Add to src/components/index.js
export { default as MyComponent } from './MyComponent';

// 3. Use it anywhere
import { MyComponent } from '@/components';
<MyComponent prop1="Hello" prop2="World" />
```

### Add a New Page
```jsx
// 1. Create file in src/pages/NewPage.jsx
import { useNavigate } from 'react-router-dom';

const NewPage = () => {
  return <div>New Page Content</div>;
};

export default NewPage;

// 2. Add route in src/App.jsx
import NewPage from './pages/NewPage';
<Route path="/new-page" element={<NewPage />} />

// 3. Navigate to it
navigate('/new-page');
```

## 📊 Routes Reference

```
/                    → Dashboard
/shops               → Shops List
/shops/:id           → Shop Details
/transactions        → Transactions
/inventory           → Inventory
/reports             → Reports & Analytics
/settings            → Settings
```

## 🎨 Color System

```jsx
// Primary colors (use these for consistency)
const colors = {
  primary: '#7BA428',      // Earthy green
  dark: '#5C4033',         // Dark brown
  secondary: '#8B6F47',    // Secondary brown
  accent: '#D2B48C',       // Accent light
  background: '#FFFCF7',   // Cream
};

// Tailwind classes available
className="text-primary-600"
className="bg-accent-50"
className="border-secondary-200"
```

## 💾 Data Structure Reference

### Shop Object
```javascript
{
  id: 1,
  name: "Shop Name",
  owner: "Owner Name",
  email: "owner@email.com",
  phone: "9876543210",
  address: "City Address",
  sales: 50000,
  paymentStatus: "Paid" | "Partial" | "Pending",
  status: "Active" | "Inactive",
  rating: 4.5
}
```

### Transaction Object
```javascript
{
  id: 1,
  invoiceNo: "INV001",
  shopName: "Shop Name",
  date: "2024-01-15",
  quantity: 100,
  pricePerKg: 500,
  totalAmount: 50000,
  status: "Paid" | "Pending"
}
```

### Inventory Object
```javascript
{
  id: 1,
  name: "Product Name",
  quantity: 1000,
  unit: "kg",
  price: 500,
  lowStockThreshold: 200,
  lastUpdated: "2024-01-15"
}
```

## 🚀 Development Workflow

### Start Development
```bash
npm install               # First time only
npm run dev             # Starts on http://localhost:3000
```

### Build for Production
```bash
npm run build           # Creates optimized dist/
npm run preview         # Preview production build locally
```

### Common Commands
```bash
# Hot reload (automatic while npm run dev is running)
# Just save file, browser updates instantly

# Check dependencies
npm list

# Clean reinstall
rm -rf node_modules
npm install

# Check for outdated packages
npm outdated
```

## 📝 Styling Guide

### Using Tailwind Classes
```jsx
// Container & Layout
<div className="w-full h-screen p-4 bg-gray-50">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    
    // Card
    <div className="bg-white rounded-lg shadow p-6">
      // Type
      <h1 className="text-2xl font-bold text-gray-900">Heading</h1>
      <p className="text-sm text-gray-600 mt-2">Subtext</p>
    </div>
  </div>
</div>

// Button styles
className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"

// Responsive
className="hidden md:block"    // Hide on mobile, show on tablet+
className="block md:hidden"    // Show on mobile, hide on tablet+
className="flex flex-col md:flex-row"  // Stack on mobile, side-by-side on desktop
```

### Component Prop Pattern
```jsx
// Boolean props
<Button disabled />           // true
<Button disabled={false} />   // explicitly false

// String/Number props
<Button size="lg" />
<Input type="email" />

// Object/Array props
<Table columns={[...]} />

// Children
<Modal>
  <h1>Title</h1>
  <p>Content</p>
</Modal>
```

## 🐛 Debugging Tips

### Check Component Props
```jsx
// Add to component for debugging
console.log('Component props:', { prop1, prop2, ... });
```

### React DevTools
- Install Chrome extension: React Developer Tools
- Inspect components in Components tab
- Check props in real-time

### Network Tab
- Check API calls (when backend is integrated)
- Monitor performance

### Console Errors
- Always check browser console (F12 → Console)
- React warnings often indicate prop issues

## 📚 Key Concepts Used

### React Hooks
- `useState` - Component state
- `useEffect` - Side effects (not used much in this project)
- `useParams` - URL parameters
- `useNavigate` - Navigation
- `useMemo` - Performance optimization
- `useCallback` - Function memoization

### Tailwind CSS
- Utility-first approach
- Mobile-first responsive design
- No custom CSS needed
- Rapid development

### Component Props
- Accept data via props
- Make components reusable
- Unidirectional data flow

### Custom Hooks
- Encapsulate state logic
- Reuse logic across components
- Example: useSearch, usePagination

## 🔐 Environment Variables

Create `.env.local` for local development:
```
VITE_API_URL=http://localhost:3001
VITE_APP_NAME=HOMA-NATURALS
VITE_APP_VERSION=1.0.0
```

Reference in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🎓 Learning Resources

### Files to Read First
1. `QUICKSTART.md` - Get started quickly
2. `COMPONENTS.md` - Component API reference
3. `README.md` - Project overview
4. `src/components/index.js` - Component exports
5. `src/hooks/useHooks.js` - Custom hooks

### Documentation Standards
- All files have JSDoc comments
- Component props are documented
- Usage examples provided
- Clear variable names

## ✅ Pre-Production Checklist

- [ ] Test all routes
- [ ] Test all components
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test search/filter/sort on each page
- [ ] Check console for errors
- [ ] Verify dummy data
- [ ] Test pagination
- [ ] Check button states (hover, active, disabled)

## 🚀 Ready to Extend!

This codebase is structured for easy addition of:
- Backend API integration
- User authentication
- Real-time notifications
- Export functionality
- Multi-language support
- Dark mode
- Additional pages/features

Follow the patterns established here for consistency!

---

**Happy Coding! 🎉**
