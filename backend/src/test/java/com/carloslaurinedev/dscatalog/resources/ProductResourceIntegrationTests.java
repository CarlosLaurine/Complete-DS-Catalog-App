package com.carloslaurinedev.dscatalog.resources;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.repositories.ProductRepository;
import com.carloslaurinedev.dscatalog.services.ProductService;
import com.carloslaurinedev.dscatalog.tests.Factory;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProductResourceIntegrationTests {

	@Autowired
	private MockMvc mockMVC;

	@Autowired
	private ProductResource resource;

	@Autowired
	private ProductService service;

	@Autowired
	private ProductRepository repository;
	
	@Autowired
	private ObjectMapper objectMapper;

	private long existingId;
	private long nonExistingId;
	private long countTotalProducts;
	private ProductDTO dto;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 2L;
		nonExistingId = 2500L;
		countTotalProducts = 25L;
		dto = Factory.createDefaultProductDTO();
	}

	@Test
	public void findAllPagedShouldReturnSortedPageWhenSortByNameInDescendentOrderIsRequested() throws Exception {
		
		ResultActions result =  mockMVC
								.perform(get("/products?page=0&size=12&sort=name,desc")
								.accept(MediaType.APPLICATION_JSON)
								);
		
		result.andExpect(status().isOk());
		
		
		result.andExpect(jsonPath("$.content").exists());
		result.andExpect(jsonPath("$.totalElements").value(countTotalProducts));
		result.andExpect(jsonPath("$.size").value("12"));
		result.andExpect(jsonPath("$.number").value("0"));
		result.andExpect(jsonPath("$.sort.sorted").value("true"));
		
		result.andExpect(jsonPath("$.content[0].name").value("The Lord of the Rings"));
		result.andExpect(jsonPath("$.content[1].name").value("Smart TV"));
		result.andExpect(jsonPath("$.content[2].name").value("Rails for Dummies"));	

	}
	
	@Test
	public void updateShouldReturnProductDTOAndOkStatusWhenIdExists() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(dto);
		
		String expectedName = dto.getName();
		String expectedDescription = dto.getDescription();
		
		ResultActions result =  mockMVC
								.perform(put("/products/{id}", existingId)
								.content(jsonBody)
								.contentType(MediaType.APPLICATION_JSON)
								.accept(MediaType.APPLICATION_JSON)
								);
		
		result.andExpect(status().isOk());
		result.andExpect(jsonPath("$.id").value(existingId));
		result.andExpect(jsonPath("$.name").value(expectedName));
		result.andExpect(jsonPath("$.description").value(expectedDescription));
		
	}

	@Test
	public void updateShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {
		
		String jsonBody = objectMapper.writeValueAsString(dto);
		
		ResultActions result =  mockMVC
								.perform(put("/products/{id}", nonExistingId)
								.content(jsonBody)
								.contentType(MediaType.APPLICATION_JSON)
								.accept(MediaType.APPLICATION_JSON)
								);
		
		result.andExpect(status().isNotFound());
		}

}
