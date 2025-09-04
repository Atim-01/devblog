# Dev-Blog Frontend

This is the Next.js frontend for the Dev-Blog application.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Backend Connection

The frontend is now configured to connect to your NestJS backend running on `http://localhost:3001/api`.

### API Endpoints

- **Authentication**: `/api/auth/login`, `/api/auth/register`
- **Posts**: `/api/posts` (CRUD operations)
- **Users**: `/api/users` (profile management)

### Features Implemented

- ✅ **Real Backend Integration**: Connected to NestJS API
- ✅ **Authentication Flow**: Login, register, logout with JWT
- ✅ **Post Management**: Create, read, update, delete posts
- ✅ **Error Handling**: Proper error messages and loading states
- ✅ **Loading States**: Visual feedback during API calls
- ✅ **Responsive Design**: Mobile-friendly UI

## Testing the Connection

1. **Start your NestJS backend** on port 3001
2. **Start the frontend** with `npm run dev`
3. **Test authentication** by registering/logging in
4. **Test CRUD operations** by creating, editing, and deleting posts

## Troubleshooting

- **CORS Issues**: Ensure your backend has CORS enabled for `http://localhost:3000`
- **API Connection**: Verify the backend is running and accessible at `http://localhost:3001`
- **JWT Issues**: Check that your backend is properly generating and validating JWT tokens

