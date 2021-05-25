package com.carloslaurinedev.dscatalog.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carloslaurinedev.dscatalog.dto.CategoryDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {

		List<Category> catList = repository.findAll();

		List<CategoryDTO> dtoList = catList.stream().map(cat -> new CategoryDTO(cat)).collect(Collectors.toList());

		/*
		 * List<CategoryDTO> dtoList = new ArrayList<>(); for(Category cat: catList) {
		 * dtoList.add(new CategoryDTO(cat)); }
		 */

		return dtoList;

	}

}
