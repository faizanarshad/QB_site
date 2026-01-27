# 🎯 Career Application System Guide

This guide explains how to implement and use the comprehensive job application system for QBrix Solutions.

## 🚀 Features Implemented

### 1. Job Application Form
- **Modern UI**: Clean, responsive design with animations
- **File Upload**: Resume/CV upload with validation (PDF, DOC, DOCX)
- **Form Validation**: Client-side and server-side validation
- **Real-time Feedback**: Loading states and error handling

### 2. Database Integration
- **Job Positions**: Store and manage job openings
- **Applications**: Store submitted applications with status tracking
- **File Storage**: Secure file upload and storage system

### 3. Admin Panel
- **Application Management**: View and manage all applications
- **Status Updates**: Update application status (Pending, Reviewing, Interviewing, Hired, Rejected)
- **Detailed View**: View complete application details

## 📁 Files Created/Modified

### Components
- `src/components/JobApplicationForm.tsx` - Main application form
- `src/components/AdminApplications.tsx` - Admin interface for managing applications

### API Routes
- `src/app/api/career/route.ts` - Handle application submissions
- `src/app/api/career/[id]/route.ts` - Update individual applications
- `src/app/api/jobs/route.ts` - Manage job positions

### Pages
- `src/app/career/page.tsx` - Updated with application form integration
- `src/app/admin/applications/page.tsx` - Admin page for viewing applications

### Database
- `prisma/schema.prisma` - Added JobPosition model and updated CareerApplication

## 🛠️ Setup Instructions

### 1. Environment Configuration

Create a `.env` file in your project root:

```env
# Database Configuration (app uses qbrix_DATABASE_URL)
qbrix_DATABASE_URL="postgresql://username:password@localhost:5432/qbrix_solutions"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database with job positions
npm run db:seed
```

### 3. File Upload Directory

Create the uploads directory for resumes:

```bash
mkdir -p public/uploads/resumes
```

## 🎨 How to Use

### For Job Seekers

1. **Browse Jobs**: Visit `/career` to see available positions
2. **Apply**: Click "Apply Now" on any job listing
3. **Fill Form**: Complete the application form with:
   - Personal information
   - Experience details
   - Cover letter
   - Resume upload
4. **Submit**: Applications are stored in the database

### For Administrators

1. **View Applications**: Visit `/admin/applications`
2. **Review Details**: Click the eye icon to view full application
3. **Update Status**: Use the dropdown to change application status
4. **Track Progress**: Monitor applications through different stages

## 🔧 API Endpoints

### Job Applications
- `POST /api/career` - Submit new application
- `GET /api/career` - Get all applications (admin)
- `GET /api/career/[id]` - Get specific application
- `PATCH /api/career/[id]` - Update application status

### Job Positions
- `GET /api/jobs` - Get all active job positions
- `POST /api/jobs` - Create new job position (admin)

## 📊 Database Schema

### JobPosition Model
```prisma
model JobPosition {
  id          String   @id @default(cuid())
  title       String
  department  String
  location    String
  type        String
  experience  String
  description String
  requirements String[]
  isActive    Boolean  @default(true)
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  applications CareerApplication[]
}
```

### CareerApplication Model
```prisma
model CareerApplication {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  position  String
  resume    String?
  coverLetter String?
  experience String?
  isReviewed Boolean @default(false)
  status    ApplicationStatus @default(PENDING)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  jobPositionId String?
  jobPosition   JobPosition? @relation(fields: [jobPositionId], references: [id])
}
```

## 🎯 Application Status Flow

1. **PENDING** - Application submitted, awaiting review
2. **REVIEWING** - Application under review by HR
3. **INTERVIEWING** - Candidate invited for interviews
4. **HIRED** - Candidate offered and accepted position
5. **REJECTED** - Application not selected

## 🔒 Security Features

- **File Validation**: Only PDF, DOC, DOCX files allowed
- **File Size Limit**: 5MB maximum file size
- **Email Validation**: Proper email format validation
- **Input Sanitization**: Server-side validation and sanitization
- **Secure File Storage**: Files stored in public/uploads with unique names

## 🎨 UI/UX Features

- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: Framer Motion animations for better UX
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Clear error messages for users
- **Success Feedback**: Confirmation messages for successful submissions

## 🚀 Deployment Considerations

### File Storage
For production, consider using cloud storage (AWS S3, Google Cloud Storage) instead of local file storage.

### Database
- Use a production PostgreSQL database
- Set up proper backups
- Configure connection pooling

### Environment Variables
- Set up production environment variables
- Use secure secrets management
- Configure proper CORS settings

## 🔧 Customization Options

### Form Fields
Add or modify fields in `JobApplicationForm.tsx`:
- Additional personal information
- Portfolio links
- Social media profiles
- References

### Job Categories
Modify departments in the career page:
- Add new departments
- Update department filters
- Customize department colors

### Application Workflow
Customize the application process:
- Add screening questions
- Implement multi-stage applications
- Add automated email notifications

## 📈 Analytics and Reporting

### Track Application Metrics
- Application submission rates
- Department-wise applications
- Time-to-hire metrics
- Source tracking

### Integration Possibilities
- Email marketing integration
- CRM system integration
- Applicant tracking system (ATS)
- HR management system

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check qbrix_DATABASE_URL in .env
   - Ensure database is running
   - Verify credentials

2. **File Upload Issues**
   - Check uploads directory permissions
   - Verify file size limits
   - Check file type validation

3. **Form Submission Errors**
   - Check browser console for errors
   - Verify API routes are working
   - Check database schema

### Debug Commands

```bash
# Check database connection
npx prisma db pull

# Reset database
npx prisma db push --force-reset

# View database in browser
npx prisma studio

# Check Prisma client
npx prisma generate
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the database setup guide
3. Check console logs for errors
4. Verify all dependencies are installed

---

This career application system provides a complete solution for managing job applications with a modern, user-friendly interface and robust backend functionality. 