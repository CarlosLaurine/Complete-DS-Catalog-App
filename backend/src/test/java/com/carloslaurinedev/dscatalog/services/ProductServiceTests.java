package com.carloslaurinedev.dscatalog.services;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.entities.Product;
import com.carloslaurinedev.dscatalog.repositories.CategoryRepository;
import com.carloslaurinedev.dscatalog.repositories.ProductRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.DBException;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;
import com.carloslaurinedev.dscatalog.tests.Factory;

@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;

	@Mock
	private ProductRepository repository;

	@Mock
	private CategoryRepository catRepository;

	private long existingId;
	private long nonExistingId;
	private long relatedId;
	private PageImpl<Product> page;
	private Product product;
	private ProductDTO dto;
	private Category category;

	@SuppressWarnings("deprecation")
	@BeforeEach
	void setUp() throws Exception {

		existingId = 1L;
		nonExistingId = 2000L;
		relatedId = 20L;
		product = Factory.createDefaultProduct();
		page = new PageImpl<>(List.of(product));
		category = Factory.createDefaultCategory();

		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(relatedId);

		Mockito.when(repository.findAll((Pageable) ArgumentMatchers.any())).thenReturn(page);

		Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);

		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());

		Mockito.when((repository).search(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any()))
				.thenReturn(page);

		Mockito.when(repository.getOne(existingId)).thenReturn(product);
		Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(nonExistingId);
		Mockito.when(catRepository.getOne(ArgumentMatchers.anyLong())).thenReturn(category);
	}

	@Test
	public void deleteShouldDoNothingWhenIdExists() {

		Assertions.assertDoesNotThrow(() -> {
			service.delete(existingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(existingId);
		;
	}

	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {
			service.delete(nonExistingId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(nonExistingId);
		;
	}

	@Test
	public void deleteShouldThrowDBExceptionWhenIdIsRelatedToAnotherEntity() {

		Assertions.assertThrows(DBException.class, () -> {
			service.delete(relatedId);
		});

		Mockito.verify(repository, Mockito.times(1)).deleteById(relatedId);
		;
	}

	@Test
	public void findAllPagedShouldReturnPage() {

		Pageable pageable = PageRequest.of(0, 12);

		Page<ProductDTO> result = service.findAllPaged(pageable, 0L, "");

		Assertions.assertNotNull(result);

		Mockito.verify(repository, Mockito.times(1)).search(pageable, null, "");

	}

	@Test
	public void findByIdShouldReturnAProductDTOWhenIdExists() {

		dto = service.findById(existingId);

		Assertions.assertNotNull(dto);

		Mockito.verify(repository, Mockito.times(1)).findById(existingId);

	}

	@Test
	public void findByIdShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {

			service.findById(nonExistingId);

		});

		Mockito.verify(repository, Mockito.times(1)).findById(nonExistingId);

	}

	@Test
	@SuppressWarnings("deprecation")
	public void updateShouldReturnAProductDTOWhenIdExists() {

		dto = service.update(existingId, Factory.createDefaultProductDTO());

		Assertions.assertNotNull(dto);

		Mockito.verify(catRepository, Mockito.times(2)).getOne(ArgumentMatchers.anyLong());
		Mockito.verify(repository, Mockito.times(1)).getOne(existingId);

	}

	@Test
	@SuppressWarnings("deprecation")
	public void updateShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {

		Assertions.assertThrows(ResourceNotFoundException.class, () -> {

			service.update(nonExistingId, Factory.createDefaultProductDTO());

		});

		Mockito.verify(repository, Mockito.times(1)).getOne(nonExistingId);

	}
}
