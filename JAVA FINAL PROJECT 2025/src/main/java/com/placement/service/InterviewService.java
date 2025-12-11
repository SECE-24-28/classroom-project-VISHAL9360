package com.placement.service;

import com.placement.model.Interview;
import com.placement.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewService {
    
    @Autowired
    private InterviewRepository interviewRepository;
    
    public Interview scheduleInterview(Interview interview) {
        return interviewRepository.save(interview);
    }
    
    public List<Interview> getInterviewsByApplication(Long applicationId) {
        return interviewRepository.findByApplicationId(applicationId);
    }
    
    public Interview updateInterview(Long id, Interview interview) {
        Optional<Interview> existingOpt = interviewRepository.findById(id);
        if (existingOpt.isPresent()) {
            Interview existing = existingOpt.get();
            existing.setScheduledAt(interview.getScheduledAt());
            existing.setLocation(interview.getLocation());
            existing.setStatus(interview.getStatus());
            existing.setResult(interview.getResult());
            existing.setFeedback(interview.getFeedback());
            return interviewRepository.save(existing);
        }
        return null;
    }
    
    public Optional<Interview> getInterviewById(Long id) {
        return interviewRepository.findById(id);
    }
    
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }
}
