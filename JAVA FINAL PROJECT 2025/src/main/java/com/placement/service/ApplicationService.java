package com.placement.service;

import com.placement.model.Application;
import com.placement.model.Job;
import com.placement.model.User;
import com.placement.repository.ApplicationRepository;
import com.placement.repository.JobRepository;
import com.placement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public Application createApplication(Application application) {
        return applicationRepository.save(application);
    }
    
    public List<Application> getApplicationsByStudent(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }
    
    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }
    
    public Application updateApplicationStatus(Long id, String status) {
        Optional<Application> appOpt = applicationRepository.findById(id);
        if (appOpt.isPresent()) {
            Application application = appOpt.get();
            application.setStatus(status);
            return applicationRepository.save(application);
        }
        return null;
    }
    
    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }
    
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }
    
    public boolean checkEligibility(Long studentId, Long jobId) {
        Optional<User> studentOpt = userRepository.findById(studentId);
        Optional<Job> jobOpt = jobRepository.findById(jobId);
        
        if (studentOpt.isEmpty() || jobOpt.isEmpty()) {
            return false;
        }
        
        User student = studentOpt.get();
        Job job = jobOpt.get();
        
        // Check if student meets minimum CGPA requirement
        if (job.getMinCgpa() != null && student.getCgpa() != null) {
            double studentCgpa = student.getCgpa() / 10.0;
            if (studentCgpa < job.getMinCgpa()) {
                return false;
            }
        }
        
        // Check if already applied
        List<Application> existingApps = applicationRepository.findByStudentId(studentId);
        boolean alreadyApplied = existingApps.stream()
                .anyMatch(app -> app.getJobId().equals(jobId));
        
        return !alreadyApplied;
    }
}
