package com.eclectics.Garage.model;

import jakarta.persistence.*;

@Entity
@Table(name = "mechanics")
public class Mechanic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private String phone;
    private Integer nationalId;

    //Link to garage
    private Long garageId;

    public Mechanic(Long id, String name, String specialization, String phone, Integer nationalId, Long garageId) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.phone = phone;
        this.nationalId = nationalId;
        this.garageId = garageId;
    }

    public Mechanic() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone;}

    public Integer getNationalId() { return nationalId; }
    public void setNationalId(Integer nationalId) { this.nationalId = nationalId; }

    public Long getGarageId() { return garageId; }
    public void setGarageId(Long garageId) { this.garageId = garageId;}
}

