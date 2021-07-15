package com.carloslaurinedev.dscatalog.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carloslaurinedev.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT product FROM Product product INNER JOIN product.categories cats WHERE :category IN cats")
	Page<Product> search(Pageable pageable, Long category);

}
