# 🗄️ Database Setup Guide for QBrix Solutions

This guide will help you set up a database for your QBrix Solutions website using Prisma ORM with PostgreSQL.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- PostgreSQL database (local or cloud)

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/qbrix_solutions"

# Next.js Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Database Options

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a database: `createdb qbrix_solutions`
3. Update DATABASE_URL with your credentials

#### Option B: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your database URL from Settings > Database
4. Use the connection string in your .env file

#### Option C: Neon (Free Tier)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Get your database URL
4. Use the connection string in your .env file

### 4. Generate Prisma Client

```bash
npm run db:generate
```

### 5. Push Database Schema

```bash
npm run db:push
```

### 6. Seed Database

```bash
npm run db:seed
```

### 7. Start Development Server

```bash
npm run dev
```

## 🗂️ Database Schema

The database includes the following models:

### Core Models
- **User** - User authentication and management
- **Service** - QBrix's services with features, benefits, and stats
- **Project** - Portfolio projects linked to services
- **Testimonial** - Client testimonials

### Content Models
- **BlogPost** - Blog articles with comments
- **Comment** - Blog post comments
- **ContactSubmission** - Contact form submissions
- **CareerApplication** - Job applications

### Utility Models
- **NewsletterSubscription** - Email newsletter subscriptions
- **WebsiteStat** - Website statistics and metrics

## 🔧 Available Scripts

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with initial data
npm run db:seed
```

## 📊 Database Operations

### Using the Database Client

```typescript
import { db } from '@/lib/db'

// Get all services
const services = await db.services.getAll()

// Get service by ID
const service = await db.services.getById('service-id')

// Create new service
const newService = await db.services.create({
  title: 'New Service',
  subtitle: 'Service Description',
  // ... other fields
})

// Submit contact form
await db.contact.submit({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Inquiry',
  message: 'Hello, I need help with...'
})
```

### API Routes

The following API routes are available:

- `GET /api/services` - Get all services
- `POST /api/services` - Create new service
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe/unsubscribe to newsletter

## 🛠️ Development Workflow

### 1. Making Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` to apply changes
3. Run `npm run db:generate` to update client

### 2. Adding New Data

1. Update the seed function in `src/lib/db.ts`
2. Run `npm run db:seed` to populate data

### 3. Database Management

- Use `npm run db:studio` to open Prisma Studio
- View and edit data through the web interface
- Monitor database performance

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database Access**: Use connection pooling in production
3. **Input Validation**: Always validate user input
4. **SQL Injection**: Prisma prevents SQL injection automatically

## 🚀 Production Deployment

### 1. Environment Setup
- Set up production database (PostgreSQL)
- Configure environment variables
- Set up connection pooling

### 2. Database Migration
```bash
npm run db:migrate
npm run db:seed
```

### 3. Build and Deploy
```bash
npm run build
npm start
```

## 📈 Monitoring and Maintenance

### 1. Database Monitoring
- Monitor query performance
- Set up alerts for slow queries
- Regular backup schedules

### 2. Data Backup
- Set up automated backups
- Test restore procedures
- Store backups securely

### 3. Performance Optimization
- Use database indexes
- Optimize queries
- Monitor connection pools

## 🆘 Troubleshooting

### Common Issues

1. **Connection Errors**
   - Check DATABASE_URL format
   - Verify database is running
   - Check firewall settings

2. **Migration Errors**
   - Reset database: `npx prisma migrate reset`
   - Check schema syntax
   - Verify foreign key relationships

3. **Seed Errors**
   - Check data format
   - Verify required fields
   - Check unique constraints

### Getting Help

- Check Prisma documentation: [pris.ly](https://pris.ly)
- Review error logs in console
- Use Prisma Studio for debugging

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Database Design Best Practices](https://www.prisma.io/dataguide)

---

**Need help?** Check the troubleshooting section or refer to the Prisma documentation for detailed guidance. 