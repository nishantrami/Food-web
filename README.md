<div align="center">

# 🍽️ FoodVerse — Modern Artisanal Food Delivery & Culinary Recipe Platform

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13.5-EA284E?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**A high-performance, beautifully designed food ordering web application featuring 24+ gourmet dishes, interactive step-by-step culinary cooking guides, isolated user authentication, live order status tracking, and a secret keyboard-activated Super Admin console.**

[Explore Live Demo](https://github.com/nishantrami/Food-web) • [Report Bug](https://github.com/nishantrami/Food-web/issues) • [Request Feature](https://github.com/nishantrami/Food-web/issues)

</div>

---

## 📖 Table of Contents

- [✨ Key Features](#-key-features)
- [👨‍🍳 Step-by-Step Recipe Engine](#-step-by-step-recipe-engine)
- [🔑 Secret Super Admin Console](#-secret-super-admin-console)
- [📱 Responsive Design & Mobile Navigation](#-responsive-design--mobile-navigation)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start & Installation](#-quick-start--installation)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🔐 Credentials Reference](#-credentials-reference)
- [📄 License](#-license)

---

## ✨ Key Features

### 🍕 Gourmet Menu & Smart Discovery
- **24+ Handcrafted Dishes**: Across 8 vibrant culinary categories — Wood-Fired Pizzas, Artisanal Burgers, Royal Dum Biryanis, Authentic Gujarati Heritage Thalis, Szechuan Indo-Chinese, Crispy South Indian Dosas, Italian Truffle Pastas, Healthy Quinoa Bowls, and French Patisserie Desserts.
- **Multidimensional Filters**: Search by dish or kitchen name, filter by cuisine, sort by price (low/high), delivery time, rating, or popularity, and toggle 100% Pure Veg / Non-Veg dietary flags.

### 🔒 User Authentication & Strict Order Privacy
- **Secure Local Authentication**: Register and log in with email and password.
- **Per-User Scoped State**: Cart items and placed order records are strictly isolated per user ID (`foodverse_cart_<userId>` and `foodverse_orders`).
- **Access Protection**: Private routes (`/checkout`, `/orders`, `/orders/:orderId`, `/profile`) automatically redirect unauthenticated users to `/login` with friendly notifications.

### ⚡ Real-Time Live Order Tracking
- **Interactive Multi-Stage Timeline**: Track active orders from confirmation to arrival:
  1. `Order Placed`
  2. `Preparing in Kitchen`
  3. `Out for Delivery`
  4. `Delivered`
- Real-time synchronization: When the admin updates order status in the background, the user's tracking timeline reflects updates instantly.

### 📞 24/7 Customer Support & Help Center
- Accessible at `/contact` with direct hotline call buttons, WhatsApp live chat, culinary headquarters directions, and an interactive support ticket generator (`#FV-SUP-XXXX`) with FAQ accordions.

---

## 👨‍🍳 Step-by-Step Recipe Engine

Every food item in the catalog includes an authentic, chef-tested culinary recipe accessible directly on the dish detail page (`/food/:id#recipe`):

- **Portion Scaler**: Dynamically recalculates measured ingredient quantities for **1x**, **2x**, or **4x** servings.
- **Interactive Pantry Checklist**: Check off ingredients as you gather them from your kitchen, with real-time completion tracking.
- **Detailed Step Directions**: Each cooking step features clear instructions, duration indicators, and highlight boxes with **Chef's Pro Tips**.
- **👨‍🍳 Interactive "Cooking Mode" Reader**:
  - Distraction-free, large-text step-by-step viewer designed for use while cooking.
  - **Built-in Countdown Kitchen Timer** (Start / Pause / Reset).
  - Celebration confetti upon finishing the final cooking step.
- **Share & Print**: 1-click recipe text formatting for notes/clipboard and print-friendly styling.

---

## 🔑 Secret Super Admin Console

The Admin Console is completely hidden from public visitors (no links in navbars or footers).

### How to Access:
Press the secret keyboard combination anywhere on the website:
```text
Ctrl + F    (Windows / Linux)
Cmd + F     (macOS)
```

### Admin Credentials:
| Field | Value |
| --- | --- |
| **Email** | `admin@foodverse.com` |
| **Password** | `admin123` |
| **Direct Route** | `/admin/login` |

### Capabilities:
- **📊 Operations Dashboard**: Real-time business metrics (Total Orders, Live Revenue, Active Orders requiring dispatch, Total Customers).
- **🛍️ Order Management**: Live status updater (`Order Placed` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`), order inspector modal with breakdown of items and delivery address.
- **🍽️ Menu Management**: Add custom dishes to the live catalog with dietary flags, price, and auto-generated step-by-step culinary recipes. Delete existing dishes.
- **👥 Customer Directory**: View registered customer accounts and registration dates.
- **Sidebar Navigation**: Dedicated Admin Sidebar matching the project's clean aesthetic with live order counter chips.

---

## 📱 Responsive Design & Mobile Navigation

- **Zero Lower Bar Clutter**: Removed intrusive fixed bottom bars for a natural, edge-to-edge viewing experience.
- **Top Mobile Hamburger Navigation**:
  - Clean animated toggle button (☰ / ✕) in the top Navbar on screens `< 1024px`.
  - Expanding menu drawer containing quick search, navigation routes (Home, Explore, Restaurants, Orders, Contact, Favorites), and user profile/logout actions.
- **Warm Light Aesthetic**: Curated color palette (`#FBF9F5` warm background, crisp white cards, `#EA580C` primary orange accents, and Plus Jakarta Sans typography).

---

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| **Framework** | [React 19](https://react.dev/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Animation** | [Framer Motion 13](https://www.framer.com/motion/) |
| **Icons** | [FontAwesome Free 7](https://fontawesome.com/) |
| **Routing** | [React Router DOM 7](https://reactrouter.com/) |
| **State & Persistence** | React Context API + LocalStorage |
| **Typography** | Plus Jakarta Sans (Google Fonts) |

---

## 🚀 Quick Start & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/nishantrami/Food-web.git
cd Food-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Generates production-optimized static bundles inside the `dist/` directory.

---

## 📂 Project Directory Structure

```text
Food-web/
├── public/                     # Static media and favicons
├── src/
│   ├── assets/                 # Brand imagery and hero photos
│   ├── components/
│   │   ├── admin/              # Dedicated Admin Sidebar
│   │   ├── cart/               # Cart item cards, coupons, price summary
│   │   ├── common/             # Buttons, Rating, Modals, AdminShortcutListener
│   │   ├── food/               # FoodCard, FoodFilters, FoodRecipeSection
│   │   ├── home/               # Hero banner, category slider, special offers
│   │   ├── layout/             # Top Navbar, Footer, MainLayout
│   │   ├── order/              # Order status timeline, Order cards
│   │   └── restaurant/         # Restaurant cards and menus
│   ├── constants/              # Admin credentials and coupon configurations
│   ├── context/                # Auth, AdminAuth, Cart, Favorite, Toast contexts
│   ├── data/                   # 24 dishes, restaurants, and step-by-step recipes
│   ├── hooks/                  # Custom hooks (useAuth, useCart, useToast, etc.)
│   ├── pages/
│   │   ├── admin/              # AdminLoginPage, AdminDashboardPage
│   │   ├── CartPage.jsx        # Shopping bag and checkout trigger
│   │   ├── CheckoutPage.jsx    # Delivery address & payment gateway
│   │   ├── ContactPage.jsx     # 24/7 Support hub and inquiry ticketing
│   │   ├── ExplorePage.jsx     # Full menu catalog with multi-filters
│   │   ├── FoodDetailPage.jsx  # Dish details, customizations, and recipes
│   │   ├── HomePage.jsx        # Landing showcase
│   │   ├── LoginPage.jsx       # Customer authentication
│   │   ├── OrdersPage.jsx      # Customer order history
│   │   ├── OrderDetailPage.jsx # Real-time GPS-style delivery tracker
│   │   └── ProfilePage.jsx     # User account management
│   ├── routes/                 # ProtectedRoute, AdminProtectedRoute, AppRoutes
│   ├── services/               # Mock API service layer with LocalStorage sync
│   ├── App.jsx                 # Application entry with mounted providers
│   ├── index.css               # Design tokens, variables & typography
│   └── main.jsx                # React DOM root
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🔐 Credentials Reference

- **Admin Account**: `admin@foodverse.com` / `admin123` (Trigger with <kbd>Ctrl + F</kbd>)
- **Customer Accounts**: Registered dynamically via `/register`.

---

## 📄 License

This project is licensed under the MIT License — feel free to use and customize for personal or commercial projects.

---

<div align="center">
  Crafted with ❤️ for food lovers everywhere • Powered by <strong>FoodVerse</strong>
</div>
