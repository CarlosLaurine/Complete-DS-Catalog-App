package com.carloslaurinedev.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carloslaurinedev.dscatalog.dto.CategoryDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.DBException;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository repository;

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<CategoryDTO> findAll() {

		List<Category> entityList = repository.findAll();

		List<CategoryDTO> dtoList = entityList.stream().map(entity -> new CategoryDTO(entity))
				.collect(Collectors.toList());

		/*
		 * List<CategoryDTO> dtoList = new ArrayList<>(); for(Category entity:
		 * entityList) { dtoList.add(new CategoryDTO(entity)); }
		 */

		return dtoList;

	}

	@Transactional(readOnly = true)
	public Page<CategoryDTO> findAllPaged(Pageable pageable) {

		Page<Category> entityPage = repository.findAll(pageable);

		Page<CategoryDTO> dtoPage = entityPage.map(entity -> new CategoryDTO(entity));

		return dtoPage;

	}

	@Transactional(readOnly = true)
	public CategoryDTO findById(Long id) {

		Optional<Category> obj = repository.findById(id);

		Category entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));

		CategoryDTO dto = new CategoryDTO(entity);

		return dto;

	}

	@Transactional
	public CategoryDTO insert(CategoryDTO dto) {

		Category entity = new Category();

		entity.setName(dto.getName());

		dto = new CategoryDTO(repository.save(entity));

		return dto;
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public CategoryDTO update(Long id, CategoryDTO dto) {

		try {

			Category entity = repository.getOne(id);
			entity.setName(dto.getName());
			entity = repository.save(entity);
			dto = new CategoryDTO(entity);
			return dto;

		} catch (EntityNotFoundException e) {

			throw new ResourceNotFoundException("Inexistent Id => " + id);

		}

	}

	public void delete(Long id) {

		try {

			repository.deleteById(id);

		}

		catch (EmptyResultDataAccessException e1) {

			throw new ResourceNotFoundException("Inexistent Id for Deletion => " + id);

		}

		catch (DataIntegrityViolationException e2) {

			throw new DBException("Data Integrity Violation");

		}
	}

}
