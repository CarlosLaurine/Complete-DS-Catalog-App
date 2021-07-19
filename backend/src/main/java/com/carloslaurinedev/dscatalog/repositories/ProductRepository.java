package com.carloslaurinedev.dscatalog.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.carloslaurinedev.dscatalog.entities.Category;
import com.carloslaurinedev.dscatalog.entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT DISTINCT product FROM Product product INNER JOIN product.categories cats WHERE "
			+ "(COALESCE(:categories) IS NULL OR cats in :categories) " + "AND "
			+ "(:name = '' OR LOWER(product.name) LIKE LOWER (CONCAT('%',:name,'%')))")
	Page<Product> search(Pageable pageable, List<Category> categories, String name);

}
