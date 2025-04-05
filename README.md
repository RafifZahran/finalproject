# TokoHappy E-Commerce

A React-based e-commerce application with admin features and product management.

## Features

- User Authentication
- Product Management
- Shopping Cart
- Checkout Process
- Admin Dashboard
- Image Upload
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tokohappy.git
cd tokohappy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```
REACT_APP_API_URL=your_api_url
```

4. Start the development server:
```bash
npm start
```

## Deployment

1. Build the production version:
```bash
npm run build
```

2. The build folder will contain the production-ready files.

## Admin Access

To access the admin dashboard:
- Email: admin@mail.com
- Password: admin123

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/      # React context providers
│   ├── pages/         # Page components
│   ├── services/      # API services
│   ├── App.jsx        # Main application component
│   └── index.js       # Application entry point
├── public/            # Static files
└── package.json       # Project dependencies
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 