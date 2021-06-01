package com.carloslaurinedev.dscatalog.services;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.repositories.ProductRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;

@SpringBootTest
@Transactional
public class ProductServiceIntegrationTests {

	@Autowired
	private ProductService service;
	
	@Autowired
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 2L;
		nonExistingId = 2500L;
		countTotalProducts = 25L;
	}
	
	
	@Test
	public void deleteShouldDeleteResourceWhenIdExists() {
		
		service.delete(existingId);
		
		Assertions.assertEquals(countTotalProducts - 1 , repository.count());
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(ResourceNotFoundException.class, () -> {

			service.delete(nonExistingId);

		});
	}
	
	@Test
	public void findAllPagedShouldReturnPageWhenPageHasNumber0AndSize10() {
		
		PageRequest pageable = PageRequest.of(0, 10);
		
		Page<ProductDTO> page = service.findAllPaged(pageable);
		
		Assertions.assertTrue(page.hasContent());
		
		Assertions.assertEquals(0, page.getNumber());
		Assertions.assertEquals(10, page.getSize());
		Assertions.assertEquals(countTotalProducts, page.getTotalElements());
		
	}
	
	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByNameIsRequested() {
		
		PageRequest pageable = PageRequest.of(0, 10, Sort.by("name"));
		
		Page<ProductDTO> page = service.findAllPaged(pageable);
		
		Assertions.assertFalse(page.isEmpty());
		
		Assertions.assertEquals("Macbook Pro", page.getContent().get(0).getName());
		Assertions.assertEquals("PC Gamer", page.getContent().get(1).getName());
		Assertions.assertEquals("PC Gamer Alfa", page.getContent().get(2).getName());
		
	}
	
	@Test
	public void findAllPagedShouldReturnEmptyPageWhenPageDoesNotExist() {
		
		PageRequest pageable = PageRequest.of(4, 10);
		
		Page<ProductDTO> page = service.findAllPaged(pageable);
		
		Assertions.assertTrue(page.isEmpty());
		
	}
	
}
