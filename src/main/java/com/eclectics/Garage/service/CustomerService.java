package com.eclectics.Garage.service;


import com.eclectics.Garage.model.Customer;

import java.util.List;

public interface CustomerService {
    String createCustomer(Customer customer);
    String getCustomerById(Long id);
    String getCustomerByEmail(String email);
    List<Customer> getAllCustomers();
    String updateCustomer(Long id, Customer customer);
    String deleteCustomer(Long id);
}

