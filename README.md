# Library Management System
- A comprehensive Library Management System designed to handle book records, user management, and borrowing functionalities seamlessly.

DEMO VIDEO OF THE PROJECT - https://drive.google.com/file/d/1NlzYurvPjZfYrz4t1aIhPm2c6jhgmIkw/view?usp=sharing

## Overview (Features)
  - Creating Full Stack Application using React for frontend, Express for backend, MySQL for database.
  - Added Authentication and Authorization logic using JWT to manage the roles of ADMIN and NORMAL user independently.
  - Able to handle issuing and returning books efficiently with managing edge cases.
  - Showing all the issued books books separately into user's account
  - Showing all the isted books by the ADMIN to the browse page

## Technologies Used
  - Project divided into two parts (Frontend and Backend)
  - Frontend
      - Initialize react app by 'create-react-app'
      - language - Javascript
      - Library used for frontend (user interface) - React
      - Routes - react-router-dom
      - Styling - Tailwind CSS
  - Backend
      - Framework - Express
      - Runtime env. - Node.js
      - language - Javascript
      - Database: mysql2
      - Authentication using - bcrypt, jWT
      - Object Relational Mapper(ORM) - Sequelize

## DATABASE SCHEMAS
![image](https://github.com/user-attachments/assets/6643ab2c-6448-45cd-87d1-fb2dfe14c025)
![image](https://github.com/user-attachments/assets/1b9a2895-7145-45cd-b88b-5a2927969d9c)
![image](https://github.com/user-attachments/assets/7e2782f5-909d-4c44-ad0f-2195586ec6eb)
![image](https://github.com/user-attachments/assets/a64252b3-a41b-433e-af59-2aa4b50f184b)



- Author
  - PUNYA JAIN
- Github repository of the assignment by String Ventures for FULL STACK DEVELOPER INTERN
  - https://github.com/PunyaJain24/libraryManagementSystem
 
## Backend Project structure
![image](https://github.com/user-attachments/assets/7fad07b8-8b84-4ff3-977a-f39cb3bb7f61)

## Frontend Project Structure
![image](https://github.com/user-attachments/assets/c92e5395-76e7-48e4-beaf-e41347f8f015)

## Screenshots of the website of all web pages

### LOGIN PAGE
![image](https://github.com/user-attachments/assets/b1ff9224-9f01-483b-ac39-47b5d7822439)

### After successfull Signing In - Moving to website main page
![image](https://github.com/user-attachments/assets/34806dd1-c9bb-435c-9593-74ed4b81f2d0)

### ADD BOOK page (By clicking the ADD BOOK button on the main page)

## If the USER is authorised as ADMIN
![image](https://github.com/user-attachments/assets/f87a3cda-3f6b-4430-9d3c-4eedb7ce401e)
![image](https://github.com/user-attachments/assets/bc26a9bb-0055-4d3e-9b90-e385656031df)

## If the USER IS not authorised as ADMIN
![image](https://github.com/user-attachments/assets/a8ef8e19-ea49-46a7-a030-a33ffecc796f)
![image](https://github.com/user-attachments/assets/57e12ca9-a6fa-4702-8d0d-59e1096d3753)

### Clicking the VIEW button of a particular BOOK
![image](https://github.com/user-attachments/assets/e1aa738f-baf4-464d-b53e-b86fc25a635c)

On clicking Issue Book, the book is added to the user's account, which can be seen by clicking on the YOUR BOOKS on the main page
### BORROWED BOOKS
![image](https://github.com/user-attachments/assets/a01a20f5-f9a7-4550-8b4d-e62eb4d43db2)

On clicking return, it will take us to a returnBook page 
### RETURN BOOK PAGE
![image](https://github.com/user-attachments/assets/5bd6a744-1db5-41c5-b1ec-9cc2296d6bd6)


## Conclusion
The Library Management System is a powerful combination of essential features, providing a seamless and efficient way to manage library operations. 
From handling book inventories to managing user roles, this project integrates robust authentication and authorization mechanisms using JWT to ensure 
secure and distinct workflows for admins and regular users.

The implementation of role-based access control allows admins to manage book records, while normal users can issue and return books without overstepping
their privileges. This project not only simplifies library tasks but also enhances user experience.

It reflects the culmination of diverse technologies and best practices in full-stack development, making it a standout project in managing real-world 
library systems.





