package com.carloslaurinedev.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carloslaurinedev.dscatalog.dto.CategoryDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {

		List<Category> entityList = repository.findAll();

		List<CategoryDTO> dtoList = entityList.stream().map(category -> new CategoryDTO(category))
				.collect(Collectors.toList());

		/*
		 * List<CategoryDTO> dtoList = new ArrayList<>(); for(Category cat:
		 * categoryList) { dtoList.add(new CategoryDTO(cat)); }
		 */

		return dtoList;

	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {

		Optional<Category> obj = repository.findById(id);

		Category category = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));

		CategoryDTO dto = new CategoryDTO(category);

		return dto;

	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {

		Category category = new Category();

		category.setName(dto.getName());

		dto = new CategoryDTO(repository.save(category));

		return dto;
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {

		try {

			Category category = repository.getOne(id);
			category.setName(dto.getName());
			category = repository.save(category);
			dto = new CategoryDTO(category);
			return dto;

		} catch (EntityNotFoundException e) {

			throw new ResourceNotFoundException("Inexistent Id => " + id);

		}

	}

}
