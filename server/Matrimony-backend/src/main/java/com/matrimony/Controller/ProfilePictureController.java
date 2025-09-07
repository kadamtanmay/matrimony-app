package com.matrimony.Controller;

import com.matrimony.Service.ProfilePictureService;
import com.matrimony.Entity.ProfilePicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile-picture")
public class ProfilePictureController {

    private final ProfilePictureService profilePictureService;

    @Autowired
    public ProfilePictureController(ProfilePictureService profilePictureService) {
        this.profilePictureService = profilePictureService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("file") MultipartFile file,
                                                       @RequestParam("userId") Long userId) {
        System.out.println("Controller received file: " + file.getOriginalFilename());
        try {
            String fileUrl = profilePictureService.saveProfilePicture(file, userId);
            System.out.println("File uploaded successfully: " + fileUrl);
            return ResponseEntity.ok(fileUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture.");
        }
    }

    @GetMapping
    public ResponseEntity<String> getProfilePicture(@RequestParam("userId") Long userId) {
        String profilePictureUrl = profilePictureService.getProfilePictureUrl(userId);
        if (profilePictureUrl != null) {
            return ResponseEntity.ok(profilePictureUrl);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No profile picture found.");
    }

}
