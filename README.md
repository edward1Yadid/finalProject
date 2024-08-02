# FinalProject E-commerce webstie

## Description
This project is a responsive ecommerce website dedicated to providing a seamless and secure shopping experience for its users. 
Built with modern web technologies and frameworks, it ensures intuitive navigation and robust functionality across various devices.

## Features

### User Features
- **Product Interaction**: Users can interact with products in various ways to enhance their shopping experience:
  - **Add to Wishlist**: Save products to a personalized wishlist for future consideration or purchase.
  - **Add to Favorites**: Mark products as favorites to easily revisit and track preferred items.
  - **Add to Cart**: Quickly add products to the shopping cart for seamless checkout.
  - **Make a Purchase**: Complete orders efficiently with clear guidance through the checkout process.

- **Product Ratings and Reviews**: Empower users to share their feedback and experiences with products:
  - **Rating System**: Enable users to rate products based on their satisfaction or experience using a star rating scale.

### Admin Features
- **Product Management**: Create, update, and delete products with detailed descriptions, images, pricing, and inventory management.
- **Order Management**: View, update, and approve orders for fulfillment.
- **Category Management**: Create, edit, and delete product categories and subcategories.
- **User Management**: Manage user accounts, including permissions and access levels.

### Note:
- **Category and subcategories Management**: The ability to create new categories and subcategories or modify existing ones is restricted to the admin interface and is not available on the front end of the website.

## Technologies Used
### Frontend
- **HTML/CSS**: Utilized for structuring, styling, and responsive design to enhance user experience.
- **Material Design**: Frameworks integrated for their extensive UI components and responsive layout capabilities.
- **FontAwesome**: Icon library used to enrich visual elements throughout the website.
- **JavaScript: Frontend scripting language employed for dynamic and interactive web experiences.
- **React**: Main JavaScript library utilized for building the frontend interface, ensuring high performance and modularity.
- **Redux Toolkit**: Employed for efficient state management within the React application, maintaining data flow and consistency.
- **Material-UI**: React component library following Google's Material Design guidelines, enhancing UI aesthetics and functionality.
  - **@mui/material**: Core components and styling utilities.cv      
  - **@mui/icons-material**: Icon components consistent with Material Design principles.
- **React Hook Form**: Lightweight library facilitating flexible and scalable form validations within React applications.
  - **@hookform/resolvers**: Validation resolvers supporting React Hook Form for robust form handling.
- **Axios**: Promise-based HTTP client utilized for making server requests and handling backend interactions securely.
- **JWT Decode**: Library used to decode JSON Web Tokens (JWT) for user authentication and session management.
- **Joi**: Schema validation library for JavaScript used to ensure data conforms to specific criteria, enhancing backend data validation and integrity.

### Backend
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine, enabling server-side scripting.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js used to build the server and handle routing.
- **MongoDB**: NoSQL database used for storing application data in a flexible, JSON-like format.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js, providing schema-based solutions to model data.
- **bcryptjs**: Library to hash passwords securely.
- **body-parser**: Middleware to parse incoming request bodies in a middleware before handlers.
- **chalk**: Terminal string styling done right, used for logging in different colors.
- **config**: Node-config organizes hierarchical configurations for your app deployments.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a .env file into process.env.
- **express-rate-limit**: Middleware to limit repeated requests to public APIs and/or endpoints.
- **jsonwebtoken**: Library to sign, verify and decode JSON Web Tokens.
- **lodash**: Utility library delivering modularity, performance & extras.
- **morgan**: HTTP request logger middleware for Node.js.
- **Nodemon**: Development utility that monitors for changes in your source and automatically restarts your server.

## Usage

### Connecting to the Repository

1. Clone the repository to your local machine using the following command:
    ```bash
     https://github.com/edward1Yadid/finalProject.git
    ```
### Setting Up the Project

#### Client Setup

1. Navigate to the client directory:
    ```bash
    cd client
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```

#### Server Setup

1. Navigate to the server directory:
    ```bash
    cd server
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```

### Running the Project

#### Running the Backend Server

1. Start the backend server: (production)
    ```bash
    npm run start
    ```
  this command will connect automaticly to the cluster mongoDB
2. Create a configuration file (`production.json`) in the `config` directory and add your environment variables. 


 1. Start the backend server: (development)
    ```bash
    npm run dev
    ```
    this command will connect automaticly to the local mongoDB
2. Create a configuration file ( `development.json`) in the `config` directory and add your environment variables. 
    

#### Running the Frontend Client

1. Navigate to the client directory if not already there:
    ```bash
    cd client
    ```
2. Start the frontend development server:
    ```bash
    npm run start
    ```
3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Postman Collection
For API testing and documentation, you can use the following Postman collection:
https://documenter.getpostman.com/view/29937735/2sA3e5eoCT#8985f729-d18e-43dd-a2e7-88138826ba4f


##config
###development
{
    "NODE_ENV": "development",
    "PORT": 8181,
    "TOKEN_GENERATOR": "jwt",
    "DB_NAME": null,
    "DB_PASSWORD":null,
    "LOGGER": "morgan",
    "DB": "MONGODB",
    "VALIDATION":"Joi",
    "HashPassword": "bcryptjs",
    "JWT_KEY": "my_private_key"
  }
uri: mongodb://localhost:27017/webstore

###production
{
    "NODE_ENV": "production",
    "PORT": 8181,
    "TOKEN_GENERATOR": "jwt",
    "DB_NAME": "ediyadid",
    "DB_PASSWORD": "f9c5rPvNiQR5MwJ1",
    "LOGGER": "morgan",
    "DB": "MONGODB",
    "VALIDATION":"Joi",
    "HashPassword": "bcryptjs",
    "JWT_KEY": "my_private_key"
  }

uri: mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.kxwl9ix.mongodb.net/WebStore


