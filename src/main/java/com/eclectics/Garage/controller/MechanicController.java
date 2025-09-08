package com.eclectics.Garage.controller;

import com.eclectics.Garage.model.Mechanic;
import com.eclectics.Garage.service.MechanicService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mechanic")
public class MechanicController {

        MechanicService mechanicService;

        public MechanicController(MechanicService mechanicService) {
            this.mechanicService = mechanicService;
        }

        @GetMapping("/{mechanicNationalId}")
        public Optional<Mechanic> getMechanicByNationalId(@PathVariable("mechanicId") Integer mechanicNationalId){
            return mechanicService.getMechanicByNationalId(mechanicNationalId);
        }

        @GetMapping()
        public List<Mechanic> getAllMechanics(){
            return mechanicService.getAllMechanics();
        }

        @PostMapping()
        public String createMechanic(@RequestBody Mechanic mechanic){
            mechanicService.createMechanic(mechanic);
            return "Mechanic created successfully";
        }

        @PutMapping("/{mechanicId}")
        public String updateMechanic(@PathVariable Long mechanicId, @RequestBody Mechanic mechanic){
            mechanicService.updateMechanic(mechanicId, mechanic);
            return "Mechanic updated successfully";
        }

        @DeleteMapping("/{MechanicId}")
        public String deleteAGarage(@PathVariable("MechanicId") Long MechanicId){
            mechanicService.deleteMechanic(MechanicId);
            return "Mechanic Deleted Succesfully";
        }
}
