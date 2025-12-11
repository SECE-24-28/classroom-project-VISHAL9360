# AI E-commerce Frontend

Premium React application with Tailwind CSS and glassmorphism design.

## Features

- 🎨 **Premium UI**: Glassmorphism design with smooth animations
- 💬 **AI Chat**: Floating chat assistant with real-time responses
- 🛍️ **Product Cards**: Beautiful product displays with hover effects
- 📱 **Responsive**: Mobile-first design
- ⚡ **Fast**: Vite for lightning-fast development

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env if needed (defaults work for local development)
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

4. **Build for Production**
   ```bash
   npm run build
   ```
   Output in `dist/` folder

## Project Structure

```
src/
├── components/
│   ├── Chat.jsx           # AI chat assistant
│   └── ProductCard.jsx    # Product display card
├── pages/
│   └── Home.jsx           # Main landing page
├── App.jsx                # Root component
└── index.css              # Tailwind + custom styles
```

## Styling

### Color Palette
- **Primary**: Purple gradient (#8b5cf6 → #7c3aed)
- **Accent Cyan**: #06b6d4
- **Accent Pink**: #ec4899
- **Background**: Dark gradient (slate-900 → purple-900)

### Custom Classes
- `.glass-card` - Glassmorphism card
- `.glass-card-hover` - Card with hover effects
- `.btn-primary` - Primary gradient button
- `.gradient-text` - Gradient text effect

## Components

### Chat Component
Floating chat button that expands to full chat interface.

**Props**: None (self-contained)

**Features**:
- Floating button with pulse indicator
- Expandable chat window
- Message history
- Loading states
- Mock mode support

### ProductCard Component
Premium product display with badges and hover effects.

**Props**:
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  originalPrice?: number,
  discount?: number,
  rating: number,
  reviews: number,
  trending?: boolean,
  aiRecommended?: boolean,
  image: string
}
```

## API Integration

The frontend calls these backend endpoints:

```javascript
// Search products
GET /api/search?q=query

// Get recommendations
POST /api/recommend
Body: { userProfile, products }

// Chat with AI
POST /api/chat
Body: { messages }
```

## Deployment

### Azure App Service
```bash
npm run build
az webapp up --name app-ai-ecom-dev-web --resource-group rg-ai-ecom-dev-eastus
```

### Azure Static Web Apps
```bash
npm run build
# Use GitHub Actions workflow or Azure CLI
```

## Development Tips

1. **Hot Reload**: Vite provides instant hot module replacement
2. **Tailwind IntelliSense**: Install VS Code extension for autocomplete
3. **Mock Mode**: Backend automatically uses mocks if Azure credentials not set
4. **Icons**: Using `lucide-react` for all icons

## Troubleshooting

**Issue**: Tailwind styles not applying  
**Fix**: Ensure `tailwind.config.js` content paths are correct

**Issue**: API calls failing  
**Fix**: Check backend is running on port 3000

**Issue**: Chat not working  
**Fix**: Verify backend `/api/chat` endpoint is accessible

## Performance

- **Lighthouse Score**: 95+ (target)
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3s
- **Bundle Size**: <500KB (gzipped)

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+
