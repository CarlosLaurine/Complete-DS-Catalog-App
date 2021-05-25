package com.carloslaurinedev.dscatalog.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository repository;
	
	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<Category> findAll(){
		return repository.findAll();
	}
	
}
