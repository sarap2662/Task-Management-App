# Project Name
Task Management App
## Description
This project is a web application that allows users to manage tasks, track progress, and collaborate with team members. It features a React-based frontend, a Django backend, and uses PostgreSQL for data storage.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
5. [API Endpoints](#api-endpoints)

## Technologies Used

- **Frontend:**
  - React
  - Bootstrap
  - CSS
  - HTML
  - JavaScript

- **Backend:**
  - Python
  - Django

- **Database:**
  - PostgreSQL

## Installation

### Prerequisites

- Node.js (for frontend)
- Python 3.x (for backend)
- PostgreSQL

### Frontend

1. Navigate to the frontend directory:
   cd frontend

2. Install the required npm packages:
npm install

**Backend**
1. Create a virtual environment:
python -m venv venv

2. Activate the virtual environment:
    -Windows:
    venv\Scripts\activate

    -macOS/Linux:
    source venv/bin/activate

3. Install the required Python packages:
pip install -r requirements.txt

4. Set up PostgreSQL:
Create a PostgreSQL database and user, and update the DATABASES configuration in backend/settings.py with your database details.

5. Apply database migrations:
python manage.py migrate

6. Create a superuser (optional but recommended):
python manage.py createsuperuser

## Starting the Frontend
1. Navigate to the frontend directory:
cd frontend

2. Start the React development server:
npm start

## Starting the Backend
1. Navigate to the backend directory:
cd backend

2. Start the Django development server:
python manage.py runserver

## API ENDPOINTS
User Authentication and Registration:

POST /register/: Register a new user
POST /login/: Log in a user
POST /logout/: Log out a user
Todo Tasks:

GET /todos/: List all tasks
POST /todos/: Create a new task
GET /todos/{id}/: Retrieve a task by ID
PUT /todos/{id}/: Update a task by ID
DELETE /todos/{id}/: Delete a task by ID

## AUTHENTICATION WAS NOT ADDED