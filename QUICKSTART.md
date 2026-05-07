# HOMA-NATURALS - Quick Start Guide

Get up and running in 5 minutes! 🚀

## ⚡ Ultra-Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:3000
```

## 📦 Project Setup

### First Time Setup

```bash
# Install Node.js 16+ from nodejs.org

# Navigate to project
cd /Users/saanjali/Documents/Homa-jagery-shop

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Open in Browser
```
http://localhost:3000
```

## 🎯 Available Commands

```bash
npm run dev       # Start development server (port 3000)
npm run build     # Build for production
npm run preview   # Preview production build
```

## 📁 Key File Locations

| Purpose | Location |
|---------|----------|
| Main component | `src/App.jsx` |
| Pages | `src/pages/*.jsx` |
| Reusable components | `src/components/` |
| Dummy data | `src/data/dummy.js` |
| Styles config | `tailwind.config.js` |
| Routes | `src/App.jsx` |

## 🔄 Workflow Example

### Viewing a Page
1. Go to `http://localhost:3000`
2. Click menu items to navigate
3. All data is pre-loaded from dummy data

### Modifying a Page
1. Edit file in `src/pages/`
2. Page auto-refreshes on save
3. Check browser for changes

### Adding a Component
1. Create `src/components/MyComponent.jsx`
2. Import in your page
3. Use and customize

### Updating Dummy Data
1. Edit `src/data/dummy.js`
2. Add/modify data arrays
3. Page auto-reloads

## 🧩 Component Quick Reference

```jsx
// Buttons
<Button variant="primary">Click</Button>

// Forms
<Input label="Email" placeholder="Enter..." />
<SearchBox placeholder="Search..." />

// Tables
<Table columns={cols} data={items} />
<Pagination currentPage={1} totalPages={5} />

// Status
<StatusBadge status="Paid" />
<ProgressBar value={75} />

// Containers
<Card>Content</Card>
<Modal isOpen={true}>Content</Modal>
```

## 🎨 Color Customization

Edit `tailwind.config.js`:

```javascript
colors: {
  'earthy-green': '#7BA428',      // Primary
  'earthy-dark': '#5C4033',       // Dark
  'earthy-brown': '#8B6F47',      // Secondary
  'earthy-light': '#D2B48C',      // Light
  'earthy-beige': '#F5F1E8',      // Beige
  'earthy-cream': '#FFFCF7',      // Background
}
```

## 📝 Common Tasks

### Add New Page
```jsx
// 1. Create file
src/pages/MyPage.jsx

// 2. Create component
export default function MyPage() {
  return (
    <div><h1>My Page</h1></div>
  )
}

// 3. Add route to src/App.jsx
<Route path="/mypage" element={<MyPage />} />

// 4. Add to sidebar src/components/Sidebar.jsx
```

### Add New Data
```javascript
// In src/data/dummy.js
export const myData = [
  { id: 1, name: 'Item 1' }
]

// In any component
import { myData } from '@/data/dummy'
```

### Create New Component
```jsx
// src/components/MyButton.jsx
export default function MyButton({ children, ...props }) {
  return (
    <button className="px-4 py-2 rounded...">
      {children}
    </button>
  )
}

// Use anywhere
import MyButton from '@/components/MyButton'
<MyButton>Click me</MyButton>
```

## 🐛 Debugging Tips

### Check Console
- `F12` or `Cmd+Option+I` to open DevTools
- Check Console tab for errors
- Check Network tab for API calls

### Common Issues

**Port 3000 in use?**
```bash
# Kill process on port 3000
# Or change port in vite.config.js
```

**Module not found?**
- Check file path (case-sensitive)
- Check import statements
- Verify file exists

**Styles not loading?**
- Clear browser cache
- Check Tailwind classes are correct
- Rebuild CSS

## 📚 Documentation

- **Components**: See `COMPONENTS.md`
- **Full Docs**: See `README.md`
- **Data Structure**: See `src/data/dummy.js`

## 🔗 Useful Links

- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Recharts: https://recharts.org
- Lucide Icons: https://lucide.dev

## 💡 Tips & Tricks

### Hot Module Reload
Changes auto-reload - just save!

### Component Debugging
Use React DevTools browser extension

### Performance
- Use `useMemo` for expensive calculations
- Lazy load pages with React Router
- Monitor bundle size

## 🚀 Production Build

```bash
# Build for production
npm run build

# This creates optimized build in 'dist/' folder
# Upload contents to your server
```

## 🆘 Need Help?

1. Check `COMPONENTS.md` for component usage
2. Check `README.md` for full documentation
3. Look at existing pages for examples
4. Check console for error messages

## 📞 Quick Commands Cheat Sheet

```bash
npm install              # Install dependencies
npm run dev             # Start dev server
npm run build           # Build for prod
npm run preview         # Preview build
```

---

**You're all set!** 🎉

Start exploring the app and making it your own!

**Happy coding!** 💻
