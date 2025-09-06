# Testing Guide

This document provides comprehensive testing instructions for the Dev-Blog platform.

## 🧪 Test Coverage

### Backend Testing
- **Unit Tests** - Individual service and controller methods
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Full application flow testing
- **Database Tests** - Entity and relationship testing

### Frontend Testing
- **Component Tests** - UI component functionality
- **Integration Tests** - Component interaction testing
- **E2E Tests** - Full user journey testing
- **Accessibility Tests** - WCAG compliance testing

## 🚀 Quick Test Setup

### 1. Backend Testing
```bash
cd backend

# Install dependencies
npm install

# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### 2. Frontend Testing
```bash
cd frontend

# Install dependencies
npm install

# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📋 Test Scenarios

### Authentication Flow
1. **User Registration**
   - [ ] Valid user registration
   - [ ] Duplicate username handling
   - [ ] Password validation
   - [ ] Email validation (if implemented)

2. **User Login**
   - [ ] Valid credentials login
   - [ ] Invalid credentials handling
   - [ ] JWT token generation
   - [ ] Token expiration handling

3. **User Logout**
   - [ ] Successful logout
   - [ ] Token invalidation
   - [ ] Redirect to login page

### Blog Post Management
1. **Create Post**
   - [ ] Authenticated user can create post
   - [ ] Unauthenticated user cannot create post
   - [ ] Post validation (title, content required)
   - [ ] Post creation success

2. **View Posts**
   - [ ] Public access to all posts
   - [ ] Single post view
   - [ ] Post metadata display
   - [ ] Author information display

3. **Edit Post**
   - [ ] Owner can edit their posts
   - [ ] Non-owner cannot edit posts
   - [ ] Post update validation
   - [ ] Update success feedback

4. **Delete Post**
   - [ ] Owner can delete their posts
   - [ ] Non-owner cannot delete posts
   - [ ] Delete confirmation
   - [ ] Post removal success

### UI/UX Testing
1. **Responsive Design**
   - [ ] Mobile view (320px - 768px)
   - [ ] Tablet view (768px - 1024px)
   - [ ] Desktop view (1024px+)
   - [ ] Touch interactions

2. **Loading States**
   - [ ] Page loading indicators
   - [ ] Form submission loading
   - [ ] Skeleton loaders
   - [ ] Error states

3. **Navigation**
   - [ ] Header navigation
   - [ ] Mobile menu
   - [ ] Breadcrumbs
   - [ ] Back button functionality

4. **Forms**
   - [ ] Input validation
   - [ ] Error messages
   - [ ] Success feedback
   - [ ] Form reset

## 🔧 Manual Testing Checklist

### Backend API Testing
```bash
# Test user registration
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Test user login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Test get all posts (public)
curl -X GET http://localhost:3001/api/posts

# Test create post (authenticated)
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Post","content":"This is a test post"}'
```

### Frontend Testing
1. **Homepage**
   - [ ] Loads without errors
   - [ ] Displays blog posts
   - [ ] Responsive layout
   - [ ] Navigation works

2. **Authentication Pages**
   - [ ] Login form validation
   - [ ] Registration form validation
   - [ ] Error handling
   - [ ] Success redirects

3. **Blog Post Pages**
   - [ ] Post list displays correctly
   - [ ] Single post view works
   - [ ] Create post form functions
   - [ ] Edit post form functions

4. **User Experience**
   - [ ] Loading states appear
   - [ ] Error messages display
   - [ ] Success notifications show
   - [ ] Mobile navigation works

## 🐛 Common Issues & Solutions

### Backend Issues
1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify connection credentials
   - Ensure database exists

2. **JWT Token Issues**
   - Check JWT_SECRET is set
   - Verify token expiration
   - Check token format

3. **CORS Errors**
   - Verify CORS_ORIGIN setting
   - Check frontend URL matches

### Frontend Issues
1. **API Connection Error**
   - Check NEXT_PUBLIC_API_URL
   - Verify backend is running
   - Check network connectivity

2. **Authentication Issues**
   - Check token storage
   - Verify token format
   - Check token expiration

3. **Build Errors**
   - Check TypeScript errors
   - Verify all imports
   - Check environment variables

## 📊 Performance Testing

### Backend Performance
```bash
# Test API response times
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3001/api/posts

# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:3001/api/posts
```

### Frontend Performance
1. **Lighthouse Audit**
   - Run Lighthouse on homepage
   - Check performance score
   - Verify accessibility score
   - Check SEO score

2. **Bundle Analysis**
   ```bash
   cd frontend
   npm run build
   npm run analyze
   ```

## 🔍 Debugging Tips

### Backend Debugging
1. **Enable Debug Logging**
   ```env
   LOG_LEVEL=debug
   ```

2. **Database Queries**
   - Enable TypeORM logging
   - Check query performance
   - Verify data integrity

3. **API Testing**
   - Use Postman or Insomnia
   - Check request/response headers
   - Verify status codes

### Frontend Debugging
1. **Browser DevTools**
   - Check console for errors
   - Monitor network requests
   - Verify localStorage

2. **React DevTools**
   - Check component state
   - Verify props passing
   - Monitor re-renders

3. **Next.js Debugging**
   - Check build output
   - Verify page generation
   - Monitor performance

## ✅ Test Completion Checklist

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All e2e tests pass
- [ ] Manual testing completed
- [ ] Performance testing completed
- [ ] Accessibility testing completed
- [ ] Cross-browser testing completed
- [ ] Mobile testing completed
- [ ] Error handling verified
- [ ] Security testing completed

## 📝 Test Reports

After running tests, generate reports:

```bash
# Backend coverage report
cd backend && npm run test:cov

# Frontend coverage report
cd frontend && npm run test:coverage

# E2E test report
npm run test:e2e
```

## 🚀 Continuous Integration

For CI/CD pipeline testing:

```yaml
# Example GitHub Actions workflow
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test
      - run: npm run test:e2e
```

---

**Happy Testing! 🧪**
