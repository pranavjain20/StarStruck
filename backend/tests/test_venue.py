"""Tests for the venue graph node."""
import pytest
from unittest.mock import AsyncMock, patch, MagicMock


FAKE_CROSS_REF = {
    "shared": [{"signal": "Jazz", "detail": "Both love jazz"}],
    "complementary": [{"signal": "Visual vs Musical", "detail": "Different creative outlets"}],
    "tension_points": [],
    "citations": ["Both keep night owl schedules"],
}

FAKE_QUERIES = [
    {"name": "Jazz club", "search_query": "jazz club NYC"},
    {"name": "Vinyl bar", "search_query": "vinyl listening bar NYC"},
]

FAKE_PLACES = [
    {"name": "Blue Note", "address": "131 W 3rd St", "rating": 4.5},
    {"name": "Smalls Jazz Club", "address": "183 W 10th St", "rating": 4.7},
]

FAKE_RANKED = [
    {"name": "Blue Note", "reason": "Perfect for jazz lovers", "tips": ["Arrive early"], "relevance_score": 95},
]


class TestVenueNode:
    @pytest.mark.asyncio
    async def test_brainstorms_and_ranks(self):
        state = {
            "cross_ref": FAKE_CROSS_REF,
            "user_a": {"location": "NYC"},
            "user_b": {"location": "Brooklyn"},
        }

        with patch("app.graph.nodes.venue.LLMService") as MockLLM, \
             patch("app.graph.nodes.venue.PlacesService") as MockPlaces:
            llm = MockLLM.return_value
            llm.brainstorm_venue_queries = AsyncMock(return_value=FAKE_QUERIES)
            llm.rank_venues = AsyncMock(return_value=FAKE_RANKED)

            places = MockPlaces.return_value
            places.search_venue = AsyncMock(return_value=FAKE_PLACES)

            from app.graph.nodes.venue import venue_node
            result = await venue_node(state)

        assert result["venues"] == FAKE_RANKED
        assert places.search_venue.call_count == 2
        llm.rank_venues.assert_awaited_once()

    @pytest.mark.asyncio
    async def test_empty_queries(self):
        state = {"cross_ref": FAKE_CROSS_REF, "user_a": {}, "user_b": {}}

        with patch("app.graph.nodes.venue.LLMService") as MockLLM, \
             patch("app.graph.nodes.venue.PlacesService") as MockPlaces:
            llm = MockLLM.return_value
            llm.brainstorm_venue_queries = AsyncMock(return_value=[])
            llm.rank_venues = AsyncMock(return_value=[])

            places = MockPlaces.return_value
            places.search_venue = AsyncMock()

            from app.graph.nodes.venue import venue_node
            result = await venue_node(state)

        assert result["venues"] == []
        places.search_venue.assert_not_awaited()

    @pytest.mark.asyncio
    async def test_no_candidates_from_places(self):
        state = {"cross_ref": FAKE_CROSS_REF, "user_a": {}, "user_b": {}}

        with patch("app.graph.nodes.venue.LLMService") as MockLLM, \
             patch("app.graph.nodes.venue.PlacesService") as MockPlaces:
            llm = MockLLM.return_value
            llm.brainstorm_venue_queries = AsyncMock(return_value=FAKE_QUERIES)
            llm.rank_venues = AsyncMock(return_value=[])

            places = MockPlaces.return_value
            places.search_venue = AsyncMock(return_value=[])

            from app.graph.nodes.venue import venue_node
            result = await venue_node(state)

        assert result["venues"] == []

    @pytest.mark.asyncio
    async def test_uses_user_b_location(self):
        state = {
            "cross_ref": {},
            "user_a": {"location": "LA"},
            "user_b": {"location": "Brooklyn"},
        }

        with patch("app.graph.nodes.venue.LLMService") as MockLLM, \
             patch("app.graph.nodes.venue.PlacesService") as MockPlaces:
            llm = MockLLM.return_value
            llm.brainstorm_venue_queries = AsyncMock(return_value=[{"search_query": "cafe"}])
            llm.rank_venues = AsyncMock(return_value=[])

            places = MockPlaces.return_value
            places.search_venue = AsyncMock(return_value=[])

            from app.graph.nodes.venue import venue_node
            await venue_node(state)

        places.search_venue.assert_awaited_once_with("cafe", location="Brooklyn")

    @pytest.mark.asyncio
    async def test_falls_back_to_user_a_location(self):
        state = {
            "cross_ref": {},
            "user_a": {"location": "LA"},
            "user_b": {},
        }

        with patch("app.graph.nodes.venue.LLMService") as MockLLM, \
             patch("app.graph.nodes.venue.PlacesService") as MockPlaces:
            llm = MockLLM.return_value
            llm.brainstorm_venue_queries = AsyncMock(return_value=[{"search_query": "cafe"}])
            llm.rank_venues = AsyncMock(return_value=[])

            places = MockPlaces.return_value
            places.search_venue = AsyncMock(return_value=[])

            from app.graph.nodes.venue import venue_node
            await venue_node(state)

        places.search_venue.assert_awaited_once_with("cafe", location="LA")
