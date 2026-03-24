"""Tests for the coach graph node."""
import pytest
from unittest.mock import AsyncMock, patch


FAKE_DOSSIER_A = {
    "public": {"vibe": "Night owl coder", "tags": ["tech", "music"]},
    "private": {"summary": "Loves jazz", "traits": ["curious"]},
}

FAKE_DOSSIER_B = {
    "public": {"vibe": "Design thinker", "tags": ["design", "film"]},
    "private": {"summary": "Film obsessive", "traits": ["creative"]},
}

FAKE_CROSS_REF = {
    "shared": [{"signal": "Film", "detail": "Both love cinema"}],
}

FAKE_VENUE = {"name": "Blue Note", "reason": "Jazz lovers"}

FAKE_BRIEFING = {
    "match_intel": "Great creative match",
    "conversation_playbook": ["Ask about favorite directors"],
    "minefield_map": ["Avoid schedule complaints"],
    "venue_cheat_sheet": "Blue Note is a jazz club",
    "vibe_calibration": "Keep it curious and warm",
}


class TestCoachNode:
    @pytest.mark.asyncio
    async def test_generates_both_briefings(self):
        state = {
            "cross_ref": FAKE_CROSS_REF,
            "user_a": {"dossier": FAKE_DOSSIER_A},
            "user_b": {"dossier": FAKE_DOSSIER_B},
            "venues": [FAKE_VENUE],
        }

        with patch("app.graph.nodes.coach.LLMService") as MockLLM:
            llm = MockLLM.return_value
            llm.generate_coaching = AsyncMock(return_value=FAKE_BRIEFING)

            from app.graph.nodes.coach import coach_node
            result = await coach_node(state)

        assert "coaching_a" in result
        assert "coaching_b" in result
        assert result["coaching_a"] == FAKE_BRIEFING
        assert llm.generate_coaching.await_count == 2

    @pytest.mark.asyncio
    async def test_passes_top_venue(self):
        state = {
            "cross_ref": {},
            "user_a": {"dossier": {}},
            "user_b": {"dossier": {}},
            "venues": [FAKE_VENUE, {"name": "Other"}],
        }

        with patch("app.graph.nodes.coach.LLMService") as MockLLM:
            llm = MockLLM.return_value
            llm.generate_coaching = AsyncMock(return_value={})

            from app.graph.nodes.coach import coach_node
            await coach_node(state)

        # Both calls should pass the first venue
        for call in llm.generate_coaching.call_args_list:
            assert call.kwargs["venue"] == FAKE_VENUE

    @pytest.mark.asyncio
    async def test_no_venues_passes_none(self):
        state = {
            "cross_ref": {},
            "user_a": {"dossier": {}},
            "user_b": {"dossier": {}},
            "venues": [],
        }

        with patch("app.graph.nodes.coach.LLMService") as MockLLM:
            llm = MockLLM.return_value
            llm.generate_coaching = AsyncMock(return_value={})

            from app.graph.nodes.coach import coach_node
            await coach_node(state)

        for call in llm.generate_coaching.call_args_list:
            assert call.kwargs["venue"] is None

    @pytest.mark.asyncio
    async def test_handles_empty_state(self):
        state = {}

        with patch("app.graph.nodes.coach.LLMService") as MockLLM:
            llm = MockLLM.return_value
            llm.generate_coaching = AsyncMock(return_value={})

            from app.graph.nodes.coach import coach_node
            result = await coach_node(state)

        assert result["coaching_a"] == {}
        assert result["coaching_b"] == {}
