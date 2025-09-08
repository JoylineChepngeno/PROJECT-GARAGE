package com.eclectics.Garage.service.impl;

import com.eclectics.Garage.model.Mechanic;
import com.eclectics.Garage.repository.MechanicRepository;
import com.eclectics.Garage.service.MechanicService;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MechanicServiceImpl implements MechanicService {

    private final MechanicRepository mechanicRepository;

    public MechanicServiceImpl(MechanicRepository mechanicRepository) {
        this.mechanicRepository = mechanicRepository;
    }

    @Override
    public Mechanic createMechanic(Mechanic mechanic) {
        Optional<Mechanic> mechanicExist = mechanicRepository.findMechanicByNationalId(mechanic.getNationalId());
        if (mechanicExist.isPresent()){
            throw new RuntimeException("Mechanic with this national ID already exist");
        }
        return mechanicRepository.save(mechanic);
    }

    @Override
    public Optional<Mechanic> getMechanicByNationalId(Integer id) {
        return mechanicRepository.findMechanicByNationalId(id);
    }

    //For system admin
    @Override
    public List<Mechanic> getAllMechanics() {
        return  mechanicRepository.findAll();
    }

    //Get all mechanics for a certain garage
    @Override
    public List<Mechanic> getMechanicsByGarageId(Long garageId) {
        return mechanicRepository.findAllById(Collections.singleton(garageId));
    }

    @Override
    public Mechanic updateMechanic(Long id, Mechanic mechanic) {
        return mechanicRepository.findById(id).map(em -> {
            if (mechanic.getSpecialization() != null) em.setSpecialization(mechanic.getSpecialization());
            if (mechanic.getPhone() != null) em.setPhone(mechanic.getPhone());
            if (mechanic.getName() != null) em.setName(mechanic.getName());
            if (mechanic.getNationalId() != null) em.setNationalId(mechanic.getNationalId());
            //existingMechanic.setGarageId(mechanic.getGarageId());
            return mechanicRepository.save(em);
        }).orElseThrow(()->new RuntimeException("Mechanic not found"));
    }

    @Override
    public String deleteMechanic(Long id) {
        mechanicRepository.deleteById(id);
        return "Mechanic deleted";
    }
}
