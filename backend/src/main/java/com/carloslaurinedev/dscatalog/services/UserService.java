package com.carloslaurinedev.dscatalog.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carloslaurinedev.dscatalog.dto.RoleDTO;
import com.carloslaurinedev.dscatalog.dto.UserDTO;
import com.carloslaurinedev.dscatalog.dto.UserInsertDTO;
import com.carloslaurinedev.dscatalog.dto.UserUpdateDTO;
import com.carloslaurinedev.dscatalog.entities.Role;
import com.carloslaurinedev.dscatalog.entities.User;
import com.carloslaurinedev.dscatalog.repositories.RoleRepository;
import com.carloslaurinedev.dscatalog.repositories.UserRepository;
import com.carloslaurinedev.dscatalog.services.exceptions.DBException;
import com.carloslaurinedev.dscatalog.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	private static Logger logger = LoggerFactory.getLogger(UserService.class);

	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@org.springframework.transaction.annotation.Transactional(readOnly = true)
	public List<UserDTO> findAll() {

		List<User> entityList = repository.findAll();

		List<UserDTO> dtoList = entityList.stream().map(entity -> new UserDTO(entity)).collect(Collectors.toList());

		/*
		 * List<UserDTO> dtoList = new ArrayList<>(); for(User entity: entityList) {
		 * dtoList.add(new UserDTO(entity)); }
		 */

		return dtoList;

	}

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {

		Page<User> entityPage = repository.findAll(pageable);

		Page<UserDTO> dtoPage = entityPage.map(entity -> new UserDTO(entity));

		return dtoPage;

	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {

		Optional<User> obj = repository.findById(id);

		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity Not Found"));

		UserDTO dto = new UserDTO(entity);

		return dto;

	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {

		User entity = new User();

		tranformDtoIntoEntity(entity, dto);
		
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		return new UserDTO(repository.save(entity));
 
	}

	@SuppressWarnings("deprecation")
	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {

		try {

			User entity = repository.getOne(id);

			tranformDtoIntoEntity(entity, dto);

			entity = repository.save(entity);
			UserDTO userDTO = new UserDTO(entity);
			return userDTO;

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
	private void tranformDtoIntoEntity(User entity, UserDTO dto) {

		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());

		entity.getRoles().clear();

		for (RoleDTO roleDTO : dto.getRoles()) {

			Role role = roleRepository.getOne(roleDTO.getId());
			
			entity.getRoles().add(role);
			
		}

	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		UserDetails user = repository.findByEmail(username);
		if (user == null) {
			logger.error("User Not Found -> " + username);
			throw new UsernameNotFoundException("Email Not Found");
			
		}
		
		logger.info("User Found -> " + username);
		return user;
	}

}
