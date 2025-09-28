// File: backend/src/main/java/com/cicdproject/backend/model/UserDto.java
package com.cicdproject.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String role;
}