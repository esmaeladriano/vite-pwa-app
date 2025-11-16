# Vite PWA App

This project is a Progressive Web App (PWA) built using Vite. It serves as a template for creating fast and modern web applications with offline capabilities.

## Features

- Fast development with Vite
- PWA support with service worker
- TypeScript for type safety
- Responsive design

## Project Structure

```
vite-pwa-app
├── index.html          # Main HTML document
├── package.json        # NPM configuration file
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── .gitignore          # Git ignore file
├── public
│   └── manifest.webmanifest # Web app manifest
├── src
│   ├── main.ts         # Entry point for the application
│   ├── App.ts          # Main application component
│   ├── registerServiceWorker.ts # Service worker registration
│   ├── service-worker.ts # Service worker logic
│   ├── styles
│   │   └── main.css    # Main styles
│   └── types
│       └── index.d.ts  # Custom TypeScript types
└── README.md           # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd vite-pwa-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Build the project for production:
   ```
   npm run build
   ```

## Usage

After running the development server, open your browser and navigate to `http://localhost:3000` to view the application. You can also install the app on your device for offline access.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.