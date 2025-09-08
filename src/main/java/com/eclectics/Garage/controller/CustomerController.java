package com.eclectics.Garage.controller;

import com.eclectics.Garage.model.Customer;
import com.eclectics.Garage.service.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

        CustomerService customerService;

        public CustomerController(CustomerService customerService) {
            this.customerService = customerService;
        }

        @GetMapping("/{customerId}")
        public String getOneCustomer(@PathVariable("customerId") Long Id){
            return customerService.getCustomerById(Id);
        }

        @GetMapping()
        public List<Customer> getAllCustomers(){
            return customerService.getAllCustomers();
        }

        @PostMapping()
        public String createCustomer(@RequestBody Customer customer){
            customerService.createCustomer(customer);
            return "Customer created successfully";
        }

        @PutMapping("/{customerId}")
        public String updateCustomer(@PathVariable Long customerId, @RequestBody Customer customer){
            customerService.updateCustomer(customerId, customer);
            return "Customer updated successfully";
        }

        @DeleteMapping("/{customerId}")
        public String deleteACustomer(@PathVariable("customerId") Long customerId){
            customerService.deleteCustomer(customerId);
            return "Customer Deleted Succesfully";
        }

    }
