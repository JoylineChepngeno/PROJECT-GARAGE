package com.eclectics.Garage.model;

import jakarta.persistence.*;

@Entity
@Table(name = "services")

public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceName;
    private String description;
    private Double price;

    @Column(name = "garage_id")
    private Long garageId;

    public Service(Long id, String serviceName, String description, Double price, Long garageId) {
        this.id = id;
        this.serviceName = serviceName;
        this.description = description;
        this.price = price;
        this.garageId = garageId;
    }

    public Service() {
    }

    public Long getId() {
        return id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public Long getGarageId() {
        return garageId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setGarageId(Long garageId) {
        this.garageId = garageId;
    }
}

