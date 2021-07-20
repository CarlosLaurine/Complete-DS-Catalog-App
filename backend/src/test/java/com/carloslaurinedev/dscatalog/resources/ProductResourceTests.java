package com.carloslaurinedev.dscatalog.resources;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.carloslaurinedev.dscatalog.dto.ProductDTO;
import com.carloslaurinedev.dscatalog.services.ProductService;
import com.carloslaurinedev.dscatalog.services.exceptions.DBException;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;
import com.carloslaurinedev.dscatalog.tests.Factory;
import com.carloslaurinedev.dscatalog.tests.TokenUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductResourceTests {

	@Autowired
	private MockMvc mockMVC;

	@MockBean
	private ProductService service;

	@Autowired
	private ObjectMapper objectMapper;

	@Autowired
	private TokenUtil tokenUtil;
	
	private ProductDTO productDTO;
	private PageImpl<ProductDTO> page;

	private long existingId;
	private long nonExistingId;
	private long relatedId;
	
	private String username;
	private String password;

	@BeforeEach
	public void setUp() throws Exception {

		productDTO = Factory.createDefaultProductDTO();
		page = new PageImpl<>(List.of(productDTO));
		existingId = 1L;
		nonExistingId = 2000L;
		relatedId = 3L;
		
		username = "alex@gmail.com";
		password = "123456";

		when(service.findAllPaged(ArgumentMatchers.any(), ArgumentMatchers.any(), ArgumentMatchers.any()))
				.thenReturn(page);

		when(service.findById(existingId)).thenReturn(productDTO);
		doThrow(ResourceNotFoundException.class).when(service).findById(nonExistingId);

		when(service.update(eq(existingId), any())).thenReturn(productDTO);
		doThrow(ResourceNotFoundException.class).when(service).update(eq(nonExistingId),
				ArgumentMatchers.any(ProductDTO.class));

		doNothing().when(service).delete(existingId);
		doThrow(ResourceNotFoundException.class).when(service).delete(nonExistingId);
		doThrow(DBException.class).when(service).delete(relatedId);

		when(service.insert(any())).thenReturn(productDTO);
	}

	@Test
	public void findAllShouldReturnPage() throws Exception {

		// mockMVC.perform(get("/products")).andExpect(status().isOk());

		ResultActions result = mockMVC.perform(get("/products")
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());
	}

	@Test
	public void findByIdShouldReturnProductDTOAndOkStatusWhenIdExists() throws Exception {

		ResultActions result = mockMVC.perform(get("/products/{id}", existingId)
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());

		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());

	}

	@Test
	public void findByIdShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

		ResultActions result = mockMVC.perform(get("/products/{id}", nonExistingId)
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isNotFound());

	}

	@Test
	public void updateShouldReturnProductDTOAndOkStatusWhenIdExists() throws Exception {

		String accessToken = tokenUtil.obtainAccessToken(mockMVC, username, password);
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);

		ResultActions result = mockMVC.perform(put("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isOk());

		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());

	}

	@Test
	public void updateShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

		String accessToken = tokenUtil.obtainAccessToken(mockMVC, username, password);
		
		String jsonBody = objectMapper.writeValueAsString(productDTO);

		ResultActions result = mockMVC.perform(put("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isNotFound());

	}

	@Test
	public void deleteShouldReturnNoContentStatusWhenIdExists() throws Exception {

		String accessToken = tokenUtil.obtainAccessToken(mockMVC, username, password);

		ResultActions actions = mockMVC.perform(delete("/products/{id}", existingId)
				.header("Authorization", "Bearer " + accessToken));

		actions.andExpect(status().isNoContent());
	}

	@Test
	public void deleteShouldReturnNotFoundStatusWhenIdDoesNotExist() throws Exception {

		String accessToken = tokenUtil.obtainAccessToken(mockMVC, username, password);

		ResultActions actions = mockMVC.perform(delete("/products/{id}", nonExistingId)
				.header("Authorization", "Bearer " + accessToken));

		actions.andExpect(status().isNotFound());
	}

	@Test
	public void insertShouldReturnProductDTOAndCreatedStatus() throws Exception {

		String accessToken = tokenUtil.obtainAccessToken(mockMVC, username, password);

		String jsonBody = objectMapper.writeValueAsString(productDTO);

		ResultActions result = mockMVC.perform(post("/products")
				.header("Authorization", "Bearer " + accessToken)
				.content(jsonBody)
				.contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON));

		result.andExpect(status().isCreated());

		result.andExpect(jsonPath("$.id").exists());
		result.andExpect(jsonPath("$.name").exists());
		result.andExpect(jsonPath("$.description").exists());
		result.andExpect(jsonPath("$.price").exists());
		result.andExpect(jsonPath("$.imgUrl").exists());
		result.andExpect(jsonPath("$.date").exists());
	}
}
