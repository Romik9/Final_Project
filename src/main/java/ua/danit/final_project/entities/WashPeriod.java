package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "wash_period")
@Data
public class WashPeriod implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "w_period", nullable = false, unique = true)
  private String period;
}
