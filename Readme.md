# Ecommerce Task

This project is an ecommerce application built using Node.js, Express, TypeORM, and PostgreSQL. It includes basic CRUD operations for managing products and their variants.

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn
- PostgreSQL

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nikolavelkovski/e-commerce-task.git
   cd ecommerce-task
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment-specific configuration files:

   Create a `.env` file in the root directory or and copy the information from `.env.example` and put the information of your local posgresql database created;

   **.env**

   ```plaintext
   DB_TYPE=postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_DATABASE=your_database
   ```

4. Start the project
   ```bash
   npm run start
   ```

## API Endpoints and Samples

### Products

- **Get all products**: `GET /api/products`
- **Get a specific product by ID**: `GET /api/products/:id`
- **Create a new product**: `POST /api/products`
- **Update a product**: `PATCH /api/products/:id`
- **Delete a product**: `DELETE /api/products/:id`

#### Sample Data Operations for Products

- **Create a Product**:  
   To create a product with variants, send a `POST` request to `/api/products` with the provided JSON body :

  ```json
  {
    "name": "pizza3",
    "description": "good pizza",
    "price": 22.3,
    "inventory": 2
  }
  ```

### Variants

- **Get all variants**: `GET /api/variants`
- **Get a specific variant by ID**: `GET /api/variants/:id`
- **Create a new variant**: `POST /api/variants`
- **Update a variant**: `PATCH /api/variants/:id`
- **Delete a variant**: `DELETE /api/variants/:id`

- **Create a variant**:  
   To create variant, send a `POST` request to `/api/variants` with the provided JSON body :
  ```json
  {
    "description": "ds",
    "name": "XL",
    "price": 2.33,
    "productId": "7c88acd6-53a2-45be-8b5f-9ce0a84ad748" //need to put the product_id to which productid
  }
  ```
