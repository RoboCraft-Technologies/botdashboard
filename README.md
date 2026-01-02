# Ticket Buddy Analytics Dashboard

A modern Discord bot analytics dashboard built with React, Vite, Tailwind CSS, and Supabase.

## 📁 Project Structure

```
botdashboard-main/
├── src/
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles with Tailwind directives
├── lib/
│   └── supabaseClient.js # Supabase configuration
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.cjs    # PostCSS configuration
└── .env.local            # Environment variables (not in git)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   
   The `.env.local` file should already contain your Supabase credentials. If not, create it with:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   
   The app will be running at `http://localhost:5173`

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🛠️ Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend and authentication
- **Lucide React** - Icon library

## 🎨 Features

- Discord OAuth authentication
- Real-time ticket analytics
- Server management dashboard
- Command usage statistics
- Responsive design with dark mode
- Beautiful UI with Tailwind CSS

## 📝 Notes

- The dashboard currently uses mock data for demonstration
- Supabase integration is configured but needs backend setup
- Discord OAuth integration requires additional configuration in Supabase

---

Built with ❤️ for Discord bot management
