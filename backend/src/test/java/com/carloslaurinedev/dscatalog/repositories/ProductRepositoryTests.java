package com.carloslaurinedev.dscatalog.repositories;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.EmptyResultDataAccessException;

import com.carloslaurinedev.dscatalog.entities.Product;
import com.carloslaurinedev.dscatalog.tests.Factory;

@DataJpaTest
public class ProductRepositoryTests {

	@Autowired
	ProductRepository repository;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;

	@BeforeEach
	void setup() throws Exception {

		existingId = 2L;
		nonExistingId = 2500L;
		countTotalProducts = 25L; // Number of pre existent Insertions at the Test DB
	}

	@Test
	public void saveShouldPersistWithAutoIncrementationWhenIdIsNull() {

		Product product = Factory.createDefaultProduct();

		product.setId(null);

		product = repository.save(product);

		Assertions.assertNotNull(product.getId());
		Assertions.assertEquals(countTotalProducts + 1, product.getId());

	}

	@Test
	public void findByIdShouldReturnANotNullOptionalWhenIdExists() {

		Long existentId = countTotalProducts;

		Optional<Product> optional = repository.findById(existentId);

		Assertions.assertTrue(optional.isPresent());
	}

	@Test
	public void findByIdShouldReturnANullOptionalWhenIdDoesNotExist() {

		Long nonExistentId = countTotalProducts + 200;

		Optional<Product> optional = repository.findById(nonExistentId);

		Assertions.assertFalse(optional.isPresent());

	}

	@Test
	public void deleteShouldDeleteObjectWhenExistentIdIsInformed() {

		repository.deleteById(existingId);

		Optional<Product> product = repository.findById(existingId);

		Assertions.assertFalse(product.isPresent());

	}

	@Test
	public void deleteShouldThrowEmptyResultDataAccessExceptionWhenNonexistentIdIsInformed() {

		Assertions.assertThrows(EmptyResultDataAccessException.class, () -> {

			repository.deleteById(nonExistingId);

		});

	}
}
