package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
}
