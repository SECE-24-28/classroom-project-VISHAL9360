-- Sample data for Campus Placement System
-- Run this after starting the application once

USE placement_db;

-- Insert sample users
INSERT INTO users (username, password, email, full_name, role, phone, department, cgpa, created_at) VALUES
('john_student', 'password123', 'john@student.com', 'John Smith', 'STUDENT', '9876543210', 'Computer Science', 85, NOW()),
('jane_student', 'password123', 'jane@student.com', 'Jane Doe', 'STUDENT', '9876543211', 'Electronics', 82, NOW()),
('tech_corp', 'password123', 'hr@techcorp.com', 'Tech Corporation', 'RECRUITER', '9876543200', NULL, NULL, NOW()),
('global_soft', 'password123', 'hr@globalsoft.com', 'Global Software', 'RECRUITER', '9876543201', NULL, NULL, NOW()),
('placement_officer', 'password123', 'officer@campus.com', 'Placement Officer', 'PLACEMENT_OFFICER', '9876543000', NULL, NULL, NOW());

UPDATE users SET company_name = 'Tech Corporation', designation = 'HR Manager' WHERE username = 'tech_corp';
UPDATE users SET company_name = 'Global Software', designation = 'Recruitment Head' WHERE username = 'global_soft';

-- Insert sample jobs
INSERT INTO jobs (title, description, company_name, location, salary, job_type, min_cgpa, required_skills, eligibility, posted_by, application_deadline, status, created_at) VALUES
('Software Developer', 'Looking for enthusiastic software developers with strong problem-solving skills. Must have knowledge of Java, Spring Boot, and databases.', 'Tech Corporation', 'Bangalore', 'Rs. 8-10 LPA', 'Full-time', 8.0, 'Java, Spring Boot, MySQL', 'BE/BTech in CS/IT/ECE with 8.0+ CGPA', 3, DATE_ADD(NOW(), INTERVAL 30 DAY), 'ACTIVE', NOW()),
('Web Developer', 'Frontend and backend web development position. Experience with React, Node.js preferred.', 'Tech Corporation', 'Mumbai', 'Rs. 6-8 LPA', 'Full-time', 7.5, 'React, Node.js, JavaScript', 'BE/BTech with 7.5+ CGPA', 3, DATE_ADD(NOW(), INTERVAL 25 DAY), 'ACTIVE', NOW()),
('Data Scientist Intern', 'Internship opportunity for data science enthusiasts. Work on real-world machine learning projects.', 'Global Software', 'Hyderabad', 'Rs. 20k/month', 'Internship', 8.5, 'Python, Machine Learning, SQL', 'BE/BTech with 8.5+ CGPA', 4, DATE_ADD(NOW(), INTERVAL 20 DAY), 'ACTIVE', NOW()),
('QA Engineer', 'Quality assurance engineer to ensure product quality. Manual and automation testing experience required.', 'Global Software', 'Chennai', 'Rs. 5-7 LPA', 'Full-time', 7.0, 'Testing, Selenium, API Testing', 'BE/BTech with 7.0+ CGPA', 4, DATE_ADD(NOW(), INTERVAL 28 DAY), 'ACTIVE', NOW());

-- Insert sample applications
INSERT INTO applications (student_id, job_id, status, applied_at, updated_at) VALUES
(1, 1, 'PENDING', NOW(), NOW()),
(1, 2, 'SHORTLISTED', DATE_SUB(NOW(), INTERVAL 5 DAY), DATE_SUB(NOW(), INTERVAL 2 DAY)),
(2, 3, 'PENDING', DATE_SUB(NOW(), INTERVAL 3 DAY), DATE_SUB(NOW(), INTERVAL 3 DAY)),
(2, 4, 'SELECTED', DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Insert sample interviews
INSERT INTO interviews (application_id, round, scheduled_at, location, status, result, feedback, created_at) VALUES
(2, 'Technical', DATE_ADD(NOW(), INTERVAL 10 DAY), 'Online - MS Teams', 'SCHEDULED', 'PENDING', 'To be conducted', NOW()),
(4, 'HR Round', DATE_ADD(NOW(), INTERVAL 5 DAY), 'Office - Block A', 'SCHEDULED', 'PENDING', 'Technical round completed successfully', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(4, 'Technical', DATE_SUB(NOW(), INTERVAL 20 DAY), 'Online', 'COMPLETED', 'PASSED', 'Good technical knowledge demonstrated', DATE_SUB(NOW(), INTERVAL 21 DAY));
