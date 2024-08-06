# Fullstack Blog Application (MERN Stack)

Welcome to the Fullstack Blog Application documentation! This application allows users to explore a variety of blog posts with a user-friendly interface. Below is a detailed guide on how to set up and run the application.

&nbsp;

## Overview

This full-stack blog application is built using the MERN stack (MongoDB, Express, React, Node.js).  Users can enjoy features like post categorization, pagination and a dual Dark & Light theme UI. Admins have access to additional functionalities in the Admin Dashboard, including analytics on post content and views.

&nbsp;


## Technologies Used:

1. ReactJs
2. NodeJs (Node version 18 or above)
3. ExpressJs
4. MongoDB (Database)


&nbsp;

## Features Include (Client side):

1. Blog Details Page with Dynamic URL (Slug)
2. Fully Mobile-Responsive Design
3. Post Categories
4. Pagination with Page Numbers
5. Dark and Light Theme Settings


## Features Include (Admin Dashboard):

1. Fully Mobile-Responsive Design
2. Dashboard Analytics
3. Create Posts, Edit Posts and Delete Posts
4. Settings Page.



## Screenshots:-

### Client Page >>

![Sign-in Page](https://firebasestorage.googleapis.com/v0/b/codewave-codebase-e052b.appspot.com/o/nextjs-blog%2FSignin%20-%20Dark.png?alt=media&token=b3abdef1-5c0c-404c-a81b-94d558a6bb76)


### Admin Page >>

![Admin Dashboard](https://firebasestorage.googleapis.com/v0/b/codewave-codebase-e052b.appspot.com/o/nextjs-blog%2Fadmin.png?alt=media&token=a96e398b-8d91-40ed-a938-b3714f7bccc4)

&nbsp;
&nbsp;

# Server Setup

## Environment variables
First, create the environment variables file `.env` in the server folder. The `.env` file contains the following environment variables:

- MONGODB_URL = `your MongoDB URL`
- PORT = `5000` or any port number

&nbsp;

## Set Up MongoDB:

1. Setting up MongoDB involves a few steps:
    - Visit MongoDB Atlas Website
        - Go to the MongoDB Atlas website: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

    - Create an Account
    - Log in to your MongoDB Atlas account.
    - Create a New Cluster
    - Choose a Cloud Provider and Region
    - Configure Cluster Settings
    - Create Cluster
    - Wait for Cluster to Deploy
    - Create Database User
    - Set Up IP Whitelist
    - Connect to Cluster
    - Configure Your Application
    - Test the Connection

2. Create a new database and configure the `.env` file with the MongoDB connection URL. 

## Steps to run server

1. Open the project in any editor of choice.
2. Navigate into the server directory `cd server`.
3. Run `npm i` to install the packages.
4. Run `npm start` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

&nbsp;

# Client Side Setup

## Environment variables
First, create the environment variables file `.env` in the client folder. The `.env` file contains the following environment variables:

- REACT_APP_FIREBASE_API_KEY=`Firebase key`
- REACT_APP_ADMIN_EMAIL=`admin mail id`
- REACT_APP_API_URI=`http://localhost:5000/api`


## Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `npm i` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3000`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

&nbsp;

# Admin Dashboard Setup

## Environment variables
First, create the environment variables file `.env` in the admin folder. The `.env` file contains the following environment variables:

- REACT_APP_FIREBASE_API_KEY=`Firebase key`
- REACT_APP_ADMIN_EMAIL=`admin mail id`
- REACT_APP_API_URI=`http://localhost:5000/api`


## Steps to run admin dashboard

1. Navigate into the admin directory `cd admin`.
2. Run `npm i` to install the packages.
3. Run `npm start` to run the app on `http://localhost:3001` or any other available port.

&nbsp;

# Security Note:

## Environment Variables:

- Safeguard your environment variables by storing them securely and not exposing them unintentionally.

- Ensure that only authorized personnel have access to the environment variable configurations.


&nbsp;

## For Support, Contact:

- Email: aadhithyasb1@gmail.com
