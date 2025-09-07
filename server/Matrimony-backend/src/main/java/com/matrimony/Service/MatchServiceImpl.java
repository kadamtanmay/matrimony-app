package com.matrimony.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.matrimony.CustomExceptions.ResourceNotFoundException;
import com.matrimony.Dao.MatchDao;
import com.matrimony.Dao.PreferencesDao;
import com.matrimony.Dao.UserDao;
import com.matrimony.Dto.PreferencesDto;
import com.matrimony.Dto.UserRegisterDto;
import com.matrimony.Entity.Preferences;
import com.matrimony.Entity.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MatchServiceImpl implements MatchService {

    @Autowired
    private UserDao userDao;
    
    @Autowired
    private PreferencesDao preferencesDao;
    
    @Override
    public List<User> getMatches(Long userId) {
        Preferences preferences = preferencesDao.findByUserId(userId);
        if (preferences == null) {
            throw new ResourceNotFoundException("Preferences not found for user with ID: " + userId);
        }
        
        System.out.println("Fetching matches for user: " + userId);

        return userDao.findMatchesByPreferences(
            preferences.getAge(),
            preferences.getCaste(),
            User.Gender.valueOf(preferences.getGender().toUpperCase()),  // Ensure correct enum mapping
            preferences.getLocation(),
            preferences.getProfession(),
            preferences.getReligion(),
            userId  // Exclude current user
        );
    }
}
