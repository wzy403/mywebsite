package com.mywebsite.backend.contoller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("api/projecte")
public class ProjecteController {
    
    @GetMapping("/getProjectes")
    public String getAllProjectes() throws IOException{
        Resource resource = new FileSystemResource("src/main/resources/data/projectesList.json");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }
    
}
