package com.eclectics.Garage.service.impl;

import com.eclectics.Garage.model.Service;
import com.eclectics.Garage.repository.ServiceRepository;
import com.eclectics.Garage.service.ServicesService;

import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServicesService {
    private final ServiceRepository serviceRepository;

    public ServiceServiceImpl(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @Override
    public String createService(Service service) {
        serviceRepository.save(service);
        return "Service created";
    }

    @Override
    public Optional<Service> getServiceById(Long id) {
        return serviceRepository.findById(id);
    }

    @Override
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    @Override
    public List<Service> getServicesByGarageId(Long garageId) {
        return List.of();
    }

    @Override
    public Service updateService(Long id, Service service) {
        return serviceRepository.findById(id).map(existingService -> {
            existingService.setServiceName(service.getServiceName());
            existingService.setDescription(service.getDescription());
            existingService.setPrice(service.getPrice());
            //existingService.setGarageId(service.getGarageId());
            return serviceRepository.save(existingService);
        }).orElseThrow(() -> new RuntimeException("Service not found"));
    }

    @Override
    public String deleteService(Long id) {
        serviceRepository.deleteById(id);
        return "Service Deleted";
    }
}
