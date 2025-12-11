# Campus Placement Management System

A comprehensive web-based placement management system developed for campus recruitment activities.

## Features

- **Role-based Access Control** - Separate dashboards for Students, Recruiters, and Placement Officers
- **Job Posting** - Recruiters can post jobs with eligibility criteria
- **Student Applications** - Students can browse and apply for jobs
- **Application Management** - Officers can manage applications and shortlist candidates
- **Interview Scheduling** - Track and manage interview rounds
- **Real-time Dashboard** - Track statistics and placement progress

## Technology Stack

- **Backend**: Java Spring Boot 3.1.0
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Build Tool**: Maven
- **Testing**: Postman

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Any modern web browser

## Database Setup

1. Create MySQL database:
   ```sql
   CREATE DATABASE placement_db;
   ```

2. Update database credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```

## Running the Application

1. **Clone/Navigate to project directory**

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**:
   - Open browser and go to: `http://localhost:8080`

## Usage

### For Students:
1. Register as a student with your academic details
2. Login to browse available jobs
3. Apply for jobs that match your eligibility
4. Track your application status

### For Recruiters:
1. Register your company details
2. Login to post new job openings
3. Set eligibility criteria and deadlines
4. View and manage student applications

### For Placement Officers:
1. Login to view all applications
2. Shortlist or reject candidates
3. Schedule interviews
4. Generate placement reports

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Jobs
- `GET /api/jobs` - Get all active jobs
- `GET /api/jobs/{id}` - Get job by ID
- `POST /api/jobs` - Create new job
- `GET /api/jobs/recruiter/{id}` - Get jobs by recruiter
- `PUT /api/jobs/{id}/status` - Update job status

### Applications
- `GET /api/applications` - Get all applications
- `GET /api/applications/{id}` - Get application by ID
- `POST /api/applications` - Submit application
- `GET /api/applications/student/{id}` - Get student applications
- `GET /api/applications/job/{id}` - Get applications for job
- `PUT /api/applications/{id}/status` - Update application status

### Interviews
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/{id}` - Get interview by ID
- `POST /api/interviews` - Schedule interview
- `PUT /api/interviews/{id}` - Update interview

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/by-role/{role}` - Get users by role
- `PUT /api/users/{id}` - Update user

## Testing with Postman

Import the Postman collection from `postman_collection.json` to test all API endpoints.

## Project Structure

```
src/
├── main/
│   ├── java/com/placement/
│   │   ├── model/          # Entity classes
│   │   ├── repository/      # Data access layer
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── config/          # Configuration
│   │   └── util/            # Utility classes
│   └── resources/
│       ├── static/          # Frontend files
│       └── application.properties
├── documentation/           # Design diagrams
│   ├── UML_CLASS_DIAGRAM.txt
│   ├── ER_DIAGRAM.txt
│   ├── SYSTEM_ARCHITECTURE.txt
│   ├── WORKFLOW_DIAGRAM.txt
│   └── API_DOCUMENTATION.txt
└── test/
    └── java/
```

## Documentation

This project includes complete documentation in the `documentation/` folder:

- **UML Class Diagram** - Class structure and relationships
- **ER Diagram** - Database schema design
- **System Architecture** - Multi-layer architecture overview
- **Workflow Diagrams** - Process flows for all operations
- **API Documentation** - Complete REST API reference

## Authors

Developed as a Final Year Project

## License

Educational use only
