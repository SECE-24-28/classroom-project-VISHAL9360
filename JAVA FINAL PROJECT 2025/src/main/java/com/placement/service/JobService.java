package com.placement.service;

import com.placement.model.Job;
import com.placement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    public List<Job> getAllActiveJobs() {
        return jobRepository.findByStatus("ACTIVE");
    }
    
    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }
    
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }
    
    public List<Job> getJobsByRecruiter(Long recruiterId) {
        return jobRepository.findByPostedBy(recruiterId);
    }
    
    public Job updateJobStatus(Long id, String status) {
        Optional<Job> jobOpt = jobRepository.findById(id);
        if (jobOpt.isPresent()) {
            Job job = jobOpt.get();
            job.setStatus(status);
            return jobRepository.save(job);
        }
        return null;
    }
    
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
