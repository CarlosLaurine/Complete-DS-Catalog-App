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
import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.entities.Product;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;
import com.carloslaurinedev.dscatalog.repositories.ProductRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.DBException;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class ProductService {

	@Autowired
	private ProductRepository repository;

	@Autowired
	private CategoryRepository catRepository;

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<ProductDTO> findAll() {

		List<Product> entityList = repository.findAll();

		List<ProductDTO> dtoList = entityList.stream().map(entity -> new ProductDTO(entity))
				.collect(Collectors.toList());

		/*
		 * List<ProductDTO> dtoList = new ArrayList<>(); for(Product entity: entityList)
		 * { dtoList.add(new ProductDTO(entity)); }
		 */

		return dtoList;

	}

	@Transactional(readOnly = true)
	public Page<ProductDTO> findAllPaged(Pageable pageable) {

		Page<Product> entityPage = repository.findAll(pageable);

		Page<ProductDTO> dtoPage = entityPage.map(entity -> new ProductDTO(entity));

		return dtoPage;

	}

	@Transactional(readOnly = true)
	public ProductDTO findById(Long id) {

		Optional<Product> obj = repository.findById(id);

		Product entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));

		ProductDTO dto = new ProductDTO(entity, entity.getCategories());

		return dto;

	}

	@Transactional
	public ProductDTO insert(ProductDTO dto) {

		Product entity = new Product();

		tranformDtoIntoEntity(entity, dto);

		dto = new ProductDTO(repository.save(entity));

		return dto;
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public ProductDTO update(Long id, ProductDTO dto) {

		try {

			Product entity = repository.getOne(id);

			tranformDtoIntoEntity(entity, dto);

			entity = repository.save(entity);
			dto = new ProductDTO(entity);
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

	@SuppressWarnings("deprecation")
	private void tranformDtoIntoEntity(Product entity, ProductDTO dto) {

		entity.setName(dto.getName());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setImgUrl(dto.getImgUrl());
		entity.setPrice(dto.getPrice());

		// Clearing all possible pre-existing categories at the entity
		entity.getCategories().clear();

		for (CategoryDTO categoryDto : dto.getCategories()) {

			Category categoryEntity = catRepository.getOne(categoryDto.getId());

			entity.getCategories().add(categoryEntity);

		}
	}

}
