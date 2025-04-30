# E-Commerce Platform

## Overview
This is a fully functional **E-Commerce platform** built with **Node.js**, **Express.js**, and **MongoDB**. It provides a robust backend API for managing users, products, orders, carts, payments, and more. The platform is designed to handle essential e-commerce functionalities such as user authentication, product management, order processing, and payment integration. Containerized with Docker and enhanced with Redis for caching and session management.



---

## Features

### User Management
- User registration and login with JWT-based authentication.
- Role-based access control (e.g., admin and user roles).
- Password hashing and secure token verification.
- Wishlist functionality for users.

### Product Management
- CRUD operations for products, categories, subcategories, and brands.
- Support for product images with file upload functionality.
- Virtual fields for product reviews and ratings.

### Cart and Order Management
- Add, update, and remove items from the cart.
- Apply discount coupons to the cart.
- Create and manage orders with payment status tracking.

### Payment Integration
- Integrated with **Stripe** for online payments.
- Webhook support for handling payment events.

### Coupon System
- Create and manage discount coupons.
- Apply coupons to reduce cart total.

### Review and Rating System
- Users can add reviews and ratings for products.
- Reviews are linked to users and products.

### API Features
- Pagination, filtering, sorting, and search for product and category listings.
- Validation for incoming requests using **Joi**.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB.
- **Stripe**: Payment gateway integration.
- **Multer**: File upload handling.
- **Joi**: Request validation.
- **JWT**: Secure authentication.
- **Docker**: Containerized application environment.
