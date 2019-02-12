package com.example.baseball.controller

import com.example.baseball.domain.Player
import com.example.baseball.service.PlayerService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/teams")
class TeamController() {
    @GetMapping
    fun index(@RequestParam league: String): List<String> {
        return when (league) {
            "npb" -> listOf("日本ハム", "DeNAベイスターズ")
            "mlb" -> listOf("エンゼルス", "カブス", "マリナーズ")
            else -> listOf()
        }
    }
}
