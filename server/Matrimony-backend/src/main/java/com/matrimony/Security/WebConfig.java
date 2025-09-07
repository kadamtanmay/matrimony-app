package com.matrimony.Security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
	    registry.addMapping("/**")
	            .allowedOrigins("http://localhost:3000")
	            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Add OPTIONS method for preflight requests
	            .allowedHeaders("*")
	            .allowCredentials(true);
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:C:/Users/somes/Desktop/Matrimony-Backend/uploads/");
    }
}
