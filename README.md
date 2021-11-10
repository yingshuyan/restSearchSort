# restSearchSort

This an app currently runs locally and returns list of restaurants to the webpage based on user's inputs.

## Start

1. run `npm install` to install all packages
2. create database named `restaurants` in PostgreSQL
3. run `npm run seed` to extract, sync and seed csv data to database 
4. run `npm run start:dev` to start server and build client side files using webpack.
5. app is running on http://localhost:3030/

## Test Cases

1. customer_rating = 5, distance =5, price =18, it returns three restaurants: "Grove Table, Traditional Chow, Bang Delicious"
    - add set name ="ba" without changing search terms in step 1, it returns "Bang Delicious"
2. if there is no user's input, it returns "Deliciousgenix，Deliciouszilla，Fodder Table，Dished Grill，Sizzle Yummy“



## Back End 

1. Database
    - PostgreSQL database
    - Sequelize to provide ORM between PostgreSQL and backend
        - create two tables cuisines and restaurants
        - join tables using Sequelize associations
        - no columns allows null value
    - Extract Data from CSV
        - extract data from csv files & save to variables
        - sync and seed to database using sequelize

2. Api
    - JavaScript & express framework to create server & api

## Front End

- Webpack to build client side
- Babel to convert ECMAScript to backwards JavaScript
- React to build UI
- axios to send HTTP request to server


## Search & Sort Procedure

- Front End Effort
    - pre-define mix & max of distance, price & customer_rating input fields to prevent invalid data input

   
- Back End Effort
     - function location:
        - server/api/index.js
        - server/db/models/cuisines.js
        - server/db/models/restaurants.js

    1. Search cuisine table according to user's cuisine search term and return a cuisine list  
        - if user does not define cuisine search term, return null,
        - if there is no result match user's cuisine search term, return []

    2. Search restaurant table with returned cuisine list
        - if returned cuisine list is null, list of all restaurants will be returned (assume all restaurants have cuisine type associated)
        - if returned cuisine list is [], empty list will be returned
        - if returned cuisine list is not null or empty list, search entire restaurant table and return a list of restaurants whose cuisineId matches any id value in the cuisine list

    3. further Search restaurant list with distance, customer_rating and price according to user's search terms
        - if user does not define distance, customer_rating or price search terms, return list of restaurants from step 2 (assum all restaurants have distance, customer_rating or price values)
        - if user defines distance, customer_rating or price search terms,search through list of restaurants from step 2 and return list of restaurants whose distance is <= distance search term & customer_rating is >= rating search term & price is <= price search term

    4. Search restaurant name and return final Searched restaurant list
        - if user does not define restaurant search term, include all restaurants from step 3 (assume all restaurants have names)
        - if user defines restaurant search term, search restaurants from step 3 and return a list of restaurants whose name contains or equal to name search term (case sensitive search)

    5. Sort the final list based on priority list
        - sort distance first, then customer_rating, then price
        - return first 5 of the list



