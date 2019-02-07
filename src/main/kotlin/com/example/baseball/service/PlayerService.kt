package com.example.baseball.service

import com.example.baseball.repository.PlayerRepository
import org.springframework.stereotype.Service
import com.example.baseball.domain.Player

@Service
class PlayerService(private val playerRepository: PlayerRepository) {
    fun findAll() = playerRepository.findAll()

    fun findOne(id: Long) = playerRepository.findById(id).orElse(null)

    fun save(player: Player) = playerRepository.save(player)

    fun delete(id: Long) = playerRepository.deleteById(id)
}