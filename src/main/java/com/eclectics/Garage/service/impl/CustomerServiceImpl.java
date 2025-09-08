package com.eclectics.Garage.service.impl;

import com.eclectics.Garage.model.Customer;
import com.eclectics.Garage.repository.CustomerRepository;
import com.eclectics.Garage.service.CustomerService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public String createCustomer(Customer customer) {
        customerRepository.save(customer);
        return "Customer added";
    }

    @Override
    public String getCustomerById(Long id) {
        customerRepository.findById(id);
        return "Customer by that Id is: ";
    }

    @Override
    public String getCustomerByEmail(String email) {
        customerRepository.findByEmail(email);
        return "Customer by that email is: ";
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public String updateCustomer(Long id, Customer customer) {
        Optional<Customer> existingCustomerOptional = customerRepository.findById(id);

        if (existingCustomerOptional.isPresent()) {
            Customer existingCustomer = existingCustomerOptional.get();

            existingCustomer.setFullName(customer.getFullName());
            existingCustomer.setEmail(customer.getEmail());
            existingCustomer.setPhoneNumber(customer.getPhoneNumber());
            existingCustomer.setPassword(customer.getPassword());

            customerRepository.save(existingCustomer);

            return "Customer details updated successfully";
        } else {
            return "Customer with ID " + id + " not found";
        }
    }

    @Override
    public String deleteCustomer(Long id) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        if (existingCustomer.isPresent()){
            customerRepository.deleteById(id);
            return "Customer Deleted";
        }else {
            return "No Customer with that id";
        }
    }
}
