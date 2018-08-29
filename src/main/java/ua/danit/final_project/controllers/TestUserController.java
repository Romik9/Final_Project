package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.User;

@RestController
@RequestMapping("/user")
public class TestUserController {

@GetMapping
public ResponseEntity<User> getStaticUser (){
   return ResponseEntity.ok(StaticCollection.getUser());
  }

}
