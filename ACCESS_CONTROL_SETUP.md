# Access Control Middleware Setup

## Overview

The Access Control Middleware enforces role-based ownership rules for your NestJS + Prisma application. It ensures that users can only access resources they own, while admins have full access.

## Features

- **Role-based Access Control**: Admins can access everything, regular users are restricted
- **Resource Ownership**: Users can only access their own resources
- **Automatic Route Protection**: Middleware is applied to all protected routes
- **Public Route Exclusion**: Auth endpoints and Swagger docs remain public

## Ownership Rules

### Customers
- **Users**: Can only read/update their own profile
- **Admins**: Full CRUD access to all customer profiles

### Orders, OrderItems, Billings, Shippings, LastOrders
- **Users**: Can only access resources where `customerId` matches their `user.id`
- **Admins**: Full access to all resources

### ContactSubmissions
- **Users**: Can only see their own submissions (by email)
- **Admins**: Can see all submissions

### Products & ProductRelations
- **Users**: Read-only access
- **Admins**: Full CRUD access

## Implementation

### Files Created/Modified

1. **`src/common/middleware/access-control.middleware.ts`** - Main middleware
2. **`src/common/common.module.ts`** - Common module for dependencies
3. **`src/app.module.ts`** - Updated to register middleware
4. **`src/customers/dto/create-customer.dto.ts`** - Added role field
5. **`src/customers/dto/update-customer.dto.ts`** - Inherits role field

### Middleware Registration

The middleware is registered in `app.module.ts`:

```typescript
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AccessControlMiddleware)
      .forRoutes(
        'customers',
        'orders', 
        'order-items',
        'billings',
        'shippings',
        'last-orders',
        'contact-submissions',
        'products',
        'product-relations'
      );
  }
}
```

## Usage Examples

### 1. Update User Role to Admin

**Request:**
```bash
# First, login to get JWT token
curl -X POST http://localhost:4005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Use the token to update role (requires admin privileges)
curl -X PATCH http://localhost:4005/customers/13 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"role":"ADMIN"}'
```

### 2. Access User's Own Orders

**Request:**
```bash
# Get user's own orders
curl -X GET http://localhost:4005/orders/my-orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get specific order (only if user owns it)
curl -X GET http://localhost:4005/orders/123 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Create Order (User-scoped)

**Request:**
```bash
curl -X POST http://localhost:4005/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "customerId": 13,
    "customerName": "John Doe",
    "typeOrder": "DINE_IN",
    "amount": 25.99,
    "status": "PENDING"
  }'
```

### 4. Access Products (Read-only for users)

**Request:**
```bash
# Users can read products
curl -X GET http://localhost:4005/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Users cannot create products (403 Forbidden)
curl -X POST http://localhost:4005/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"New Product","price":19.99}'
```

## Error Responses

### 403 Forbidden
```json
{
  "message": "Access denied: You can only access your own resources",
  "error": "Forbidden",
  "statusCode": 403
}
```

### 403 Forbidden (Authentication Required)
```json
{
  "message": "Authentication required",
  "error": "Forbidden",
  "statusCode": 403
}
```

## Testing the Middleware

### 1. Test User Access to Own Resources
```bash
# Login as regular user
TOKEN=$(curl -s -X POST http://localhost:4005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}' | jq -r '.access_token')

# Access own profile (should work)
curl -X GET http://localhost:4005/customers/13 \
  -H "Authorization: Bearer $TOKEN"

# Access another user's profile (should fail)
curl -X GET http://localhost:4005/customers/14 \
  -H "Authorization: Bearer $TOKEN"
```

### 2. Test Admin Access
```bash
# Login as admin
ADMIN_TOKEN=$(curl -s -X POST http://localhost:4005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}' | jq -r '.access_token')

# Access any resource (should work)
curl -X GET http://localhost:4005/customers/14 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### 3. Test Public Routes
```bash
# These should work without authentication
curl -X POST http://localhost:4005/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'

curl -X GET http://localhost:4005/api
```

## Security Features

1. **Automatic Role Checking**: Every request is validated against user role
2. **Resource Ownership Verification**: Database queries verify resource ownership
3. **Public Route Protection**: Auth endpoints remain accessible
4. **Comprehensive Coverage**: All CRUD operations are protected
5. **Clear Error Messages**: Users get meaningful feedback on access violations

## Database Schema Requirements

The middleware relies on these relationships in your Prisma schema:

- `Customer.id` - User identifier
- `Order.customerId` - Links orders to customers
- `OrderItem.orderId` - Links order items to orders
- `Billing.orderId` - Links billings to orders
- `Shipping.orderId` - Links shippings to orders
- `LastOrder.customerId` - Links last orders to customers
- `ContactSubmission.email` - Links submissions to user emails

## Troubleshooting

### Common Issues

1. **403 Forbidden on Own Resources**
   - Check if `req.user.id` matches the resource's `customerId`
   - Verify the JWT token contains correct user information

2. **Middleware Not Applied**
   - Ensure the route is included in `forRoutes()` configuration
   - Check that the middleware is properly imported

3. **Database Query Errors**
   - Verify Prisma schema relationships
   - Check that foreign keys are properly set up

### Debug Mode

To enable debug logging, add console.log statements in the middleware:

```typescript
async use(req: Request, res: Response, next: NextFunction) {
  console.log('Access Control Middleware:', {
    path: req.path,
    method: req.method,
    user: req.user
  });
  // ... rest of middleware
}
```

## Best Practices

1. **Always use JWT tokens** for authenticated requests
2. **Test both user and admin scenarios** for each endpoint
3. **Verify ownership** before allowing modifications
4. **Use meaningful error messages** for better UX
5. **Monitor access violations** for security insights

