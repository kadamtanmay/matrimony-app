package com.matrimony.Service;

import com.matrimony.Dao.ProfilePictureDao;
import com.matrimony.Dao.UserDao;
import com.matrimony.Entity.ProfilePicture;
import com.matrimony.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class ProfilePictureService {

    private final ProfilePictureDao profilePictureDao;
    private final UserDao userDao;

    // Change UPLOAD_DIR to an absolute path
    private static final String UPLOAD_DIR = "C:/Users/somes/Desktop/Matrimony-Backend/uploads/profile-pictures/";

    @Autowired
    public ProfilePictureService(ProfilePictureDao profilePictureDao, UserDao userDao) {
        this.profilePictureDao = profilePictureDao;
        this.userDao = userDao;
    }

    public String saveProfilePicture(MultipartFile file, Long userId) throws IOException {
        User user = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Ensure the upload directory exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            boolean dirCreated = directory.mkdirs();
            if (!dirCreated) {
                throw new IOException("Failed to create upload directory: " + UPLOAD_DIR);
            }
        }

        // Generate a unique filename
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        File destination = new File(directory, fileName);

        // Save the file
        System.out.println("Saving file to: " + destination.getAbsolutePath());
        file.transferTo(destination);

        // Generate file URL (adjust based on your backend configuration)
        String fileUrl = "http://localhost:8080/uploads/profile-pictures/" + fileName;

        // Check if a profile picture already exists for the user
        ProfilePicture profilePicture = profilePictureDao.findByUserId(userId);
        if (profilePicture == null) {
            profilePicture = new ProfilePicture();
        }

        profilePicture.setName(fileName);
        profilePicture.setType(file.getContentType());
        profilePicture.setFileUrl(fileUrl);
        profilePicture.setUser(user);

        profilePictureDao.save(profilePicture);
        System.out.println("Profile picture saved: " + profilePicture);

        return fileUrl;
    }

    public String getProfilePictureUrl(Long userId) {
        ProfilePicture profilePicture = profilePictureDao.findByUserId(userId);
        return (profilePicture != null) ? profilePicture.getFileUrl() : null;
    }
}
