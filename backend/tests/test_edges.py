"""Tests for graph edge functions."""
from app.graph.edges import should_include_venue


class TestShouldIncludeVenue:
    def test_true_returns_venue(self):
        assert should_include_venue({"include_venue": True}) == "venue"

    def test_false_returns_coach(self):
        assert should_include_venue({"include_venue": False}) == "coach"

    def test_missing_key_defaults_to_coach(self):
        assert should_include_venue({}) == "coach"
