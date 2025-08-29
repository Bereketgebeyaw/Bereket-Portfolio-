# Portfolio Website

A modern, responsive portfolio website built with React frontend and Node.js backend, featuring beautiful animations and a clean design.

## 🚀 Features

### Frontend (React)

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Responsive Design**: Mobile-first approach that works on all devices
- **Interactive Components**: Built with Framer Motion for engaging animations
- **Routing**: Client-side routing with React Router
- **Component-Based**: Modular, reusable components
- **CSS Variables**: Consistent theming and easy customization

### Backend (Node.js + Express)

- **RESTful API**: Clean, organized API endpoints
- **PostgreSQL Database**: Robust data storage with automatic table creation
- **Input Validation**: Comprehensive validation using express-validator
- **Security**: Helmet middleware for security headers
- **CORS Enabled**: Ready for frontend integration
- **Error Handling**: Comprehensive error handling and logging

## 🛠️ Tech Stack

### Frontend

- React 18 with JSX
- React Router for navigation
- Framer Motion for animations
- Lucide React for icons
- CSS3 with custom properties
- Responsive design

### Backend

- Node.js with Express
- PostgreSQL database
- Express-validator for validation
- CORS and Helmet for security
- Morgan for logging

## 📁 Project Structure

```
Portfolio/
├── portfolio-frontend/          # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # Entry point
│   ├── public/                # Static assets
│   └── package.json           # Frontend dependencies
│
├── portfolio-backend/          # Node.js backend
│   ├── routes/                # API route handlers
│   ├── config/                # Database configuration
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
│
└── README.md                  # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd portfolio-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development server:**

   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd portfolio-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file with your database credentials (see backend README for details)

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **Verify API is running:**
   Navigate to `http://localhost:5000/api/health`

## 🎨 Customization

### Personal Information

- Update your name, title, and description in the components
- Modify the About page with your experience and education
- Add your own projects to the Projects page
- Update contact information and social links

### Styling

- Modify CSS variables in `App.css` for color schemes
- Update component-specific styles in their respective CSS files
- Adjust animations and transitions in the CSS files

### Content

- Replace placeholder content with your actual information
- Add your own project images and descriptions
- Update skills and technologies to match your expertise

## 📱 Pages

1. **Home**: Hero section with introduction and call-to-action
2. **About**: Personal information, experience, education, and skills
3. **Projects**: Showcase of your work with filtering and detailed views
4. **Contact**: Contact form and contact information

## 🔧 Development

### Frontend Development

- All React components use `.jsx` extension as requested
- CSS modules for component-specific styling
- Responsive design with mobile-first approach
- Accessibility features included

### Backend Development

- RESTful API design
- Database migrations handled automatically
- Comprehensive error handling
- Input validation and sanitization

## 🚀 Deployment

### Frontend Deployment

- Build the project: `npm run build`
- Deploy the `build` folder to your hosting service
- Configure your domain and SSL

### Backend Deployment

- Set environment variables for production
- Use a process manager like PM2
- Set up a reverse proxy (nginx)
- Configure SSL/TLS certificates

## 📊 Database

The backend automatically creates the following tables:

- **projects**: Portfolio projects
- **skills**: Technical skills and technologies
- **contact_messages**: Contact form submissions
- **experience**: Work experience entries
- **education**: Educational background

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub
4. Contact the maintainer

## 🎯 Future Enhancements

- [ ] Authentication system
- [ ] Admin dashboard
- [ ] Blog functionality
- [ ] Image upload and management
- [ ] Analytics and tracking
- [ ] Multi-language support
- [ ] Dark/light theme toggle
- [ ] Performance optimizations

---

**Happy coding! 🎉**
