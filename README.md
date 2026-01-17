# Screenshots Pro - App Store Screenshot Generator

A beautiful, modern web application for creating professional App Store and Play Store screenshots. No design skills required!

![Screenshots Pro Preview](https://via.placeholder.com/1200x630/0F0A1A/8B5CF6?text=Screenshots+Pro)

## ✨ Features

- **🎨 Intuitive Editor** - Drag-and-drop canvas editor powered by Fabric.js
- **📱 Device Mockups** - Latest iPhone & Android device frames
- **🎯 Templates** - Pre-designed templates to get started quickly
- **✍️ Text Tools** - Beautiful typography with custom fonts
- **🌈 Backgrounds** - Stunning gradients and solid colors
- **📦 Export to ZIP** - Download all screenshots in one click
- **💾 Auto-Save** - Projects saved locally in your browser
- **🆓 100% Free** - No login, no subscriptions, no watermarks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/screenshots-pro.git
cd screenshots-pro

# Install dependencies
yarn install

# Start development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
yarn start
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework |
| [MUI](https://mui.com/) | UI components |
| [Tailwind CSS](https://tailwindcss.com/) | Utility styling |
| [Fabric.js](http://fabricjs.com/) | Canvas manipulation |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Zustand](https://zustand-demo.pmnd.rs/) | State management |
| [JSZip](https://stuk.github.io/jszip/) | ZIP file generation |
| [idb](https://github.com/jakearchibald/idb) | IndexedDB wrapper |

## 📁 Project Structure

```
screenshots-pro/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   └── editor/             # Editor page
│   ├── components/
│   │   └── editor/             # Editor components
│   │       ├── EditorCanvas.tsx
│   │       ├── EditorHeader.tsx
│   │       ├── EditorSidebar.tsx
│   │       ├── EditorToolbar.tsx
│   │       ├── PropertyPanel.tsx
│   │       ├── ScreensPanel.tsx
│   │       ├── ExportModal.tsx
│   │       └── sidebar/        # Sidebar tabs
│   ├── constants/              # App constants
│   │   ├── colors.ts           # Color system
│   │   ├── devices.ts          # Device configs
│   │   └── fonts.ts            # Font configs
│   ├── store/                  # Zustand stores
│   ├── types/                  # TypeScript types
│   └── utils/                  # Utility functions
├── public/
│   └── devices/                # Device frame images
└── package.json
```

## 🎨 Customization

### Colors

All colors are defined in `src/constants/colors.ts`. The app uses a dark theme with purple/blue accent colors.

### Fonts

The app uses custom fonts from Fontshare and Google Fonts:
- **Clash Display** - Headlines
- **Satoshi** - Body text
- **JetBrains Mono** - Monospace

### Adding Device Frames

1. Add your device PNG to `public/devices/`
2. Update `src/constants/devices.ts` with the device configuration

## 📱 Supported Devices

### iOS
- iPhone 15 Pro Max
- iPhone 15 Pro
- iPhone 15
- iPhone 14
- iPad Pro 12.9"

### Android
- Pixel 8 Pro
- Pixel 8
- Galaxy S24 Ultra
- Galaxy S24

## 🚢 Deployment

The app can be deployed to any static hosting platform:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Cloudflare Pages**
- **GitHub Pages** (with static export)

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 💖 Acknowledgments

- [Fabric.js](http://fabricjs.com/) for the amazing canvas library
- [Fontshare](https://www.fontshare.com/) for beautiful free fonts
- [Lucide](https://lucide.dev/) for icons

---

Made with ❤️ for indie developers
