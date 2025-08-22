# 🔐 Authentication & Authorization Setup Guide

## Overview
This NestJS application now includes a complete JWT-based authentication and role-based access control (RBAC) system.

## 🚀 Features
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: USER and ADMIN roles
- **Password Hashing**: Secure password storage with bcrypt
- **Protected Routes**: Guards and decorators for route protection
- **User Scoping**: Users can only access their own data
- **Admin Access**: Admins can access all data

## 📋 Prerequisites
- PostgreSQL database running
- Environment variables configured
- All dependencies installed

## ⚙️ Environment Configuration

### Required Environment Variables
Create or update your `.env` file:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="24h"

# Application Port
PORT=5003
```

### JWT Secret Recommendations
- Use a strong, random string (at least 32 characters)
- Never commit to version control
- Consider using a secure secret manager in production

## 🗄️ Database Setup

### 1. Run Migrations
```bash
npx prisma migrate dev --name add_user_role
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

## 🔧 API Endpoints

### Authentication Endpoints

#### POST `/auth/register`
Create a new user account
```json
{
  "customerId": "CUST-001",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "username": "johndoe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "city": "New York",
  "location": "NYC"
}
```

#### POST `/auth/login`
Authenticate and receive JWT token
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "customerId": "CUST-001",
    "role": "USER"
  }
}
```

#### POST `/auth/change-password`
Change user password (requires authentication)
```json
{
  "oldPassword": "currentpassword",
  "newPassword": "newsecurepassword"
}
```

#### GET `/auth/profile`
Get current user profile (requires authentication)

#### GET `/auth/admin-only`
Admin-only endpoint (requires ADMIN role)

### Protected Endpoints

#### Orders
- `GET /orders` - Get all orders (ADMIN only)
- `GET /orders/my-orders` - Get user's own orders
- `GET /orders/:id` - Get specific order (owner or ADMIN)
- `POST /orders` - Create new order
- `PATCH /orders/:id` - Update order (owner or ADMIN)
- `DELETE /orders/:id` - Delete order (owner or ADMIN)

## 🛡️ Security Features

### JWT Authentication Guard
```typescript
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
```

### Role-Based Access Control
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
```

### User Scoping
- Regular users can only access their own data
- Admins can access all data
- Automatic filtering based on user role

## 🔑 Usage Examples

### 1. Register a New User
```bash
curl -X POST http://localhost:5003/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUST-001",
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### 2. Login and Get Token
```bash
curl -X POST http://localhost:5003/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### 3. Use JWT Token for Protected Endpoints
```bash
curl -X GET http://localhost:5003/orders/my-orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 4. Create an Order (Authenticated)
```bash
curl -X POST http://localhost:5003/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "ORD-001",
    "customerName": "John Doe",
    "typeOrder": "DINE_IN",
    "amount": 25.99,
    "status": "PENDING"
  }'
```

## 🧪 Testing

### 1. Test Public Endpoints
```bash
# Test Swagger UI
curl http://localhost:4005/api

# Test products (public)
curl http://localhost:4005/products
```

### 2. Test Authentication
```bash
# Test protected endpoint without token (should fail)
curl http://localhost:4005/orders/my-orders

# Test with invalid token (should fail)
curl -H "Authorization: Bearer invalid-token" \
  http://localhost:4005/orders/my-orders
```

### 3. Test Role-Based Access
```bash
# Test admin-only endpoint as regular user (should fail)
curl -H "Authorization: Bearer USER_TOKEN" \
  http://localhost:4005/auth/admin-only

# Test admin-only endpoint as admin (should succeed)
curl -H "Authorization: Bearer ADMIN_TOKEN" \
  http://localhost:4005/auth/admin-only
```

## 🔒 Security Best Practices

### 1. JWT Token Management
- Store tokens securely (not in localStorage for web apps)
- Implement token refresh mechanism
- Set appropriate expiration times

### 2. Password Security
- Enforce strong password policies
- Use bcrypt for password hashing
- Implement rate limiting for login attempts

### 3. Role Management
- Regularly audit user roles
- Implement least privilege principle
- Monitor admin access

## 🚨 Troubleshooting

### Common Issues

#### 1. JWT_SECRET not defined
```
Error: JWT_SECRET is not defined in environment variables
```
**Solution**: Add JWT_SECRET to your .env file

#### 2. Database connection issues
```
Error: Environment variable not found: DATABASE_URL
```
**Solution**: Verify DATABASE_URL in .env file and database connectivity

#### 3. Migration errors
```
Error: Migration failed
```
**Solution**: Check database permissions and run `npx prisma migrate reset` if needed

#### 4. Type errors
```
Error: Type 'any' is not assignable
```
**Solution**: Ensure all imports are correct and types are properly defined

### Debug Mode
Enable debug logging by setting:
```bash
DEBUG=* npm run start:dev
```

## 📚 Additional Resources

- [NestJS Authentication Documentation](https://docs.nestjs.com/security/authentication)
- [JWT.io](https://jwt.io/) - JWT token decoder
- [Passport.js Documentation](http://www.passportjs.org/)
- [bcrypt Documentation](https://github.com/dcodeIO/bcrypt.js)

## 🎯 Next Steps

1. **Implement Refresh Tokens**: Add refresh token functionality
2. **Add Rate Limiting**: Implement login attempt throttling
3. **Audit Logging**: Log authentication events
4. **Multi-Factor Authentication**: Add 2FA support
5. **Session Management**: Implement session tracking

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the NestJS documentation
3. Check the application logs
4. Verify environment configuration
