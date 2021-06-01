package com.carloslaurinedev.dscatalog.tests;

import java.time.Instant;

import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.entities.Product;

public class Factory {

	public static Product createDefaultProduct() {

		Product product = new Product(1L, "Phone", "Good Phone", 800.0, "https://img.com/img.png",
				Instant.parse("2020-10-20T03:00:00Z"));
		product.getCategories().add(new Category(2L, "Electronics"));
		product.getCategories().add(new Category(3L, "BUNGALASDUNGALAS"));


		return product;
	}

	public static ProductDTO createDefaultProductDTO() {

		Product product = createDefaultProduct();

		ProductDTO dto = new ProductDTO(product, product.getCategories());

		return dto;

	}
	
	public static Category createDefaultCategory() {
		
		return new Category(2L, "Electronics");
		
	}
}
