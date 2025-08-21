# API Testing Guide

## Overview
This guide explains how to properly test the Restaurant Management API endpoints.

## Authentication Setup

### 1. Get JWT Token
First, you need to authenticate to get a JWT token:

**Endpoint:** `POST /auth/login`
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 13,
    "email": "admin@example.com",
    "name": "Updated Admin User",
    "customerId": "CUST-1755444690145-HUOADT",
    "role": "ADMIN"
  }
}
```

## Testing Methods

### 1. Swagger UI Testing

1. **Access Swagger UI:** `http://localhost:4005/api`
2. **Authenticate:**
   - Click the "Authorize" button (lock icon)
   - Enter your JWT token: `your_jwt_token_here`
   - Click "Authorize"
3. **Test Endpoints:** Now you can test protected endpoints

### 2. Postman Testing

1. **Set Authorization:**
   - Type: Bearer Token
   - Token: `your_jwt_token_here`
2. **Test Endpoints:** Make requests to protected endpoints

### 3. cURL Testing

```bash
# Get token
curl -X POST http://localhost:4005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'

# Use token for protected endpoints
curl -X GET http://localhost:4005/products \
  -H "Authorization: Bearer your_jwt_token_here"
```

## Available Endpoints

### Public Endpoints (No Authentication Required)
- `GET /products/public` - Get all products (public access)
- `GET /products/public/:id` - Get product by ID (public access)
- `GET /products/public/slug/:slug` - Get product by slug (public access)
- `GET /customers` - Get customers list (public access)

### Protected Endpoints (Authentication Required)

#### Products (Admin Only for Write Operations)
- `GET /products` - Get all products (authenticated users)
- `GET /products/:id` - Get product by ID (authenticated users)
- `GET /products/slug/:slug` - Get product by slug (authenticated users)
- `POST /products` - Create product (ADMIN only)
- `PATCH /products/:id` - Update product (ADMIN only)
- `DELETE /products/:id` - Delete product (ADMIN only)

#### Orders
- `GET /orders` - Get all orders (ADMIN only)
- `GET /orders/my-orders` - Get user's own orders
- `POST /orders` - Create order (authenticated users)
- `PATCH /orders/:id` - Update order (owner or ADMIN)
- `DELETE /orders/:id` - Delete order (owner or ADMIN)

#### Customers
- `GET /customers/:id` - Get customer profile (owner only)
- `PATCH /customers/:id` - Update customer profile (owner only)
- `DELETE /customers/:id` - Delete customer (owner only)

## Common Issues & Solutions

### 1. 403 Forbidden Error
**Problem:** "Authentication required"
**Solution:** 
- Make sure you're authenticated
- Check if your JWT token is valid
- Ensure you're using the correct authorization header

### 2. 401 Unauthorized Error
**Problem:** Invalid or expired token
**Solution:**
- Get a new token by logging in again
- Check if the token format is correct

### 3. 404 Not Found Error
**Problem:** Resource doesn't exist
**Solution:**
- Check if the ID exists in the database
- Verify the endpoint URL is correct

## Testing Checklist

- [ ] Can authenticate and get JWT token
- [ ] Can access public endpoints without authentication
- [ ] Can access protected endpoints with valid token
- [ ] Cannot access protected endpoints without token
- [ ] Admin can perform all operations
- [ ] Regular users can only access their own resources
- [ ] Public endpoints work without authentication

## Environment Variables

Make sure these are set in your `.env` file:
```
JWT_SECRET=your_jwt_secret_here
DATABASE_URL=your_database_url_here
PORT=4005
```
