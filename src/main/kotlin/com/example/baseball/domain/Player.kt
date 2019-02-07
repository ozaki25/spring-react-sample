package com.example.baseball.domain

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity
data class Player(
    @Id
    @GeneratedValue
    val id: Long? = null,
    val name: String? = null,
    val age: Int? = null,
    val team: String? = null,
    val position: String? = null
)