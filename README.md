# Paperless - AI-Powered Receipt & Invoice Management

A comprehensive full-stack application for managing receipts and invoices with AI-powered data extraction, categorization, and analytics. Go paperless with intelligent document management.

## 🚀 Features

### Core Functionality

- **User Authentication** - Secure login/register with JWT
- **File Upload** - Support for images (JPG, PNG) and PDFs
- **AI Data Extraction** - OCR + LLM-powered text extraction
- **Smart Categorization** - Automatic categorization using AI
- **Search & Filter** - Advanced search and filtering capabilities
- **Analytics Dashboard** - Spending insights and trends
- **Export Options** - CSV, PDF export functionality

### AI/LLM Features

- **Intelligent Data Extraction** - Extract vendor, date, amount, tax, line items
- **Automatic Categorization** - Smart categorization into spending categories
- **Smart Summaries** - AI-generated spending reports
- **Chat Interface** - Natural language queries about your data
- **Smart Reminders** - AI-powered invoice reminders and forecasting

## 🛠 Tech Stack

### Backend

- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** database with Prisma ORM
- **AWS S3** for file storage
- **OpenAI API** for LLM processing
- **Tesseract.js** for OCR
- **JWT** authentication
- **Joi** for validation

### Frontend

- **Next.js 16** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **React Query** for data fetching
- **React Hook Form** for forms
- **React Dropzone** for file uploads
- **Recharts** for analytics
- **Lucide React** for icons

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database
- AWS S3 bucket
- OpenAI API key

### Backend Setup

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Update `.env` with your values:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/paperless_app"
   JWT_SECRET="your-super-secret-jwt-key"
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   S3_BUCKET_NAME="paperless-uploads"
   OPENAI_API_KEY="your-openai-api-key"
   PORT=3001
   FRONTEND_URL="http://localhost:3000"
   ```

4. **Set up database:**

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the backend:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create `.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

4. **Start the frontend:**
   ```bash
   npm run dev
   ```

## 🎯 Usage

### Getting Started

1. Register a new account or login
2. Upload your first receipt or invoice
3. AI will automatically extract data and categorize
4. Review and edit extracted information
5. Use the dashboard to view analytics and insights

### Key Features

#### Upload Documents

- Drag and drop or click to upload
- Support for camera capture on mobile
- Automatic AI data extraction
- Manual editing of extracted data

#### Dashboard Analytics

- Total spending overview
- Category-wise breakdown
- Monthly spending trends
- Top vendors analysis
- Recent transactions

#### Search & Filter

- Search by vendor, amount, date
- Filter by category, status, date range
- Advanced filtering options

#### Export & Reports

- Export data to CSV/Excel
- Generate PDF reports
- Tax-ready summaries

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Receipts

- `GET /api/receipts` - List receipts
- `POST /api/receipts` - Create receipt
- `POST /api/receipts/upload` - Upload receipt file
- `GET /api/receipts/:id` - Get receipt
- `PUT /api/receipts/:id` - Update receipt
- `DELETE /api/receipts/:id` - Delete receipt

### Invoices

- `GET /api/invoices` - List invoices
- `POST /api/invoices` - Create invoice
- `POST /api/invoices/upload` - Upload invoice file
- `GET /api/invoices/:id` - Get invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice

### Categories & Tags

- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `GET /api/tags` - List tags
- `POST /api/tags` - Create tag

### Analytics

- `GET /api/analytics/dashboard` - Dashboard data
- `GET /api/analytics/trends` - Spending trends

## 🤖 AI Features

### Data Extraction

- Vendor name extraction
- Date and time parsing
- Amount and currency detection
- Tax calculation
- Line item extraction
- Payment method detection

### Categorization

- Automatic spending category assignment
- Vendor-based categorization
- Description analysis
- Custom category learning

### Smart Features

- Duplicate detection
- Anomaly detection
- Spending pattern analysis
- Invoice due date tracking
- Automated reminders

## 📱 Mobile Support

- Responsive design for all screen sizes
- Camera integration for mobile uploads
- Touch-friendly interface
- Offline capability (coming soon)

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- File upload validation
- Rate limiting
- CORS protection
- Input sanitization

## 🚀 Deployment

### Backend Deployment

1. Set up PostgreSQL database
2. Configure AWS S3 bucket
3. Set environment variables
4. Deploy to your preferred platform (Vercel, Railway, etc.)

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email peaseadeniji@gmail.com or create an issue on GitHub.

---

Built with ❤️ using Next.js, Node.js, and AI for Paperless
