package com.eclectics.Garage.service;

import com.eclectics.Garage.model.Mechanic;

import java.util.List;
import java.util.Optional;

public interface MechanicService {
    Mechanic createMechanic(Mechanic mechanic);
    Optional<Mechanic> getMechanicByNationalId(Integer id);
    List<Mechanic> getAllMechanics();
    List<Mechanic> getMechanicsByGarageId(Long garageId);
    Mechanic updateMechanic(Long id, Mechanic mechanic);
    String deleteMechanic(Long id);
}
