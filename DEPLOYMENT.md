# MPC Psychology Center - Production Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Free)
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Connect your GitHub** repository
3. **Deploy automatically** with one click
4. **Custom domain** available

### Option 2: Netlify
1. **Sign up** at [netlify.com](https://netlify.com)
2. **Connect repository** and deploy
3. **Custom domain** support

### Option 3: Railway
1. **Sign up** at [railway.app](https://railway.app)
2. **Deploy from GitHub**
3. **Automatic HTTPS**

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup
Create `.env.local` file with:
```env
# Email Configuration
RESEND_API_KEY=your_resend_api_key_here
CONTACT_TO_EMAIL=your-email@example.com
FROM_EMAIL=noreply@yourdomain.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME="MPC Psychology Center"
```

### 2. Email Service Setup (Resend)
1. **Sign up** at [resend.com](https://resend.com)
2. **Get API key** from dashboard
3. **Verify domain** for sending emails
4. **Add API key** to environment variables

### 3. Domain Setup
1. **Purchase domain** (e.g., from Namecheap, GoDaddy)
2. **Configure DNS** to point to your hosting provider
3. **Enable HTTPS** (automatic with Vercel/Netlify)

### 4. Google Analytics (Optional)
1. **Create account** at [analytics.google.com](https://analytics.google.com)
2. **Get tracking ID**
3. **Add to environment variables**:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🔧 Production Optimizations

### 1. Performance
- ✅ Image optimization with Next.js
- ✅ Code splitting and lazy loading
- ✅ Compression enabled
- ✅ CDN distribution

### 2. SEO
- ✅ Meta tags and Open Graph
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt

### 3. Security
- ✅ HTTPS enforcement
- ✅ Security headers
- ✅ XSS protection
- ✅ CSRF protection

## 📱 Mobile Optimization
- ✅ Responsive design
- ✅ Touch-friendly interface
- ✅ Fast loading on mobile
- ✅ PWA ready

## 🔍 Search Engine Optimization

### 1. Google Search Console
1. **Add your site** to Google Search Console
2. **Verify ownership** (DNS or HTML file)
3. **Submit sitemap** for indexing
4. **Monitor performance**

### 2. Local SEO
1. **Google My Business** listing
2. **Local citations** and directories
3. **Review management**
4. **Local keywords** optimization

## 📊 Analytics & Monitoring

### 1. Google Analytics Setup
```javascript
// Add to _app.tsx or layout.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export function GoogleAnalytics() {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_location: url,
      });
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}
```

### 2. Performance Monitoring
- **Core Web Vitals** tracking
- **Page speed** monitoring
- **Uptime** monitoring
- **Error tracking** (Sentry)

## 🛠️ Admin Panel Setup

### 1. Authentication
```bash
npm install next-auth @prisma/client prisma
```

### 2. Database Setup
```bash
# Install Prisma
npm install prisma --save-dev

# Initialize Prisma
npx prisma init

# Add to schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

### 3. Admin Access
- **Create admin user** in database
- **Secure admin routes** with authentication
- **Role-based access** control

## 📧 Email Configuration

### 1. Resend Setup
```javascript
// Example email sending
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'MPC Psychology <noreply@yourdomain.com>',
  to: ['client@example.com'],
  subject: 'Consultation Confirmation',
  html: '<p>Thank you for your consultation request!</p>',
});
```

### 2. Email Templates
- **Consultation confirmations**
- **Appointment reminders**
- **Newsletter templates**
- **Admin notifications**

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env` files
- ✅ Use strong, unique keys
- ✅ Rotate keys regularly
- ✅ Limit access to production keys

### 2. API Security
- ✅ Rate limiting
- ✅ Input validation
- ✅ CORS configuration
- ✅ Authentication middleware

### 3. Content Security
- ✅ HTTPS only
- ✅ Secure headers
- ✅ XSS prevention
- ✅ CSRF protection

## 📈 Performance Optimization

### 1. Image Optimization
```javascript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logo.png"
  alt="MPC Logo"
  width={200}
  height={100}
  priority
/>
```

### 2. Code Splitting
```javascript
// Lazy load components
import dynamic from 'next/dynamic';

const AdminPanel = dynamic(() => import('../components/AdminPanel'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
```

### 3. Caching Strategy
- **Static pages** - long cache
- **Dynamic content** - short cache
- **API responses** - appropriate cache
- **Images** - aggressive cache

## 🚀 Deployment Commands

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📞 Support & Maintenance

### 1. Regular Updates
- **Dependencies** - monthly updates
- **Security patches** - immediate
- **Content updates** - as needed
- **Performance monitoring** - weekly

### 2. Backup Strategy
- **Database backups** - daily
- **Content backups** - weekly
- **Configuration backups** - monthly
- **Disaster recovery** plan

### 3. Monitoring
- **Uptime monitoring** - 24/7
- **Error tracking** - real-time
- **Performance monitoring** - continuous
- **Security monitoring** - ongoing

## 🎯 Success Metrics

### 1. Performance Goals
- **Page load time** < 3 seconds
- **Core Web Vitals** - Good/Excellent
- **Mobile performance** - 90+ score
- **Uptime** > 99.9%

### 2. SEO Goals
- **Google ranking** - Top 10 for keywords
- **Organic traffic** - 20% monthly growth
- **Backlinks** - Quality over quantity
- **Local visibility** - Top 3 in area

### 3. Business Goals
- **Consultation requests** - Track conversion
- **Email signups** - Newsletter growth
- **Page engagement** - Time on site
- **Return visitors** - User retention

## 🔗 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Google Search Console](https://search.google.com/search-console)
- [Resend Email Service](https://resend.com)
- [Google Analytics](https://analytics.google.com)

---

**Need Help?** Contact your development team or refer to the official documentation for each service.
