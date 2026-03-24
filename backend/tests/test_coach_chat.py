"""Tests for the /coach/chat endpoint."""
import pytest
from unittest.mock import AsyncMock, patch
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
def async_client():
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


CHAT_REQUEST = {
    "user_a_name": "Alex",
    "user_b_name": "Luna",
    "user_a_dossier": {
        "public": {"vibe": "Night owl coder", "tags": ["tech"], "schedule_pattern": "night owl"},
        "private": {"summary": "Loves jazz", "traits": ["curious"], "interests": ["music"], "deep_cuts": []},
    },
    "user_b_dossier": {
        "public": {"vibe": "Jazz photographer", "tags": ["jazz"], "schedule_pattern": "night owl"},
        "private": {"summary": "Film lover", "traits": ["creative"], "interests": ["film"], "deep_cuts": []},
    },
    "crossref": {
        "shared": [{"signal": "Jazz", "detail": "Both love it", "source": "both"}],
        "complementary": [],
        "tension_points": [],
        "citations": [],
    },
    "message": "What should we talk about?",
    "history": [],
}


class TestCoachChatEndpoint:
    async def test_returns_reply(self, async_client):
        with patch("app.main.llm_service") as mock_llm:
            mock_llm.coach_chat = AsyncMock(return_value="Talk about jazz vinyl collections!")

            resp = await async_client.post("/coach/chat", json=CHAT_REQUEST)

        assert resp.status_code == 200
        data = resp.json()
        assert data["reply"] == "Talk about jazz vinyl collections!"

    async def test_with_history(self, async_client):
        request = {
            **CHAT_REQUEST,
            "history": [
                {"role": "user", "content": "Hi"},
                {"role": "assistant", "content": "Hey! How can I help?"},
            ],
            "message": "Give me a conversation starter",
        }

        with patch("app.main.llm_service") as mock_llm:
            mock_llm.coach_chat = AsyncMock(return_value="Ask about her vinyl collection!")

            resp = await async_client.post("/coach/chat", json=request)

        assert resp.status_code == 200
        # Verify history was passed through
        call_args = mock_llm.coach_chat.call_args
        assert len(call_args.kwargs["history"]) == 2

    async def test_minimal_dossiers(self, async_client):
        minimal = {
            "user_a_name": "User",
            "user_b_name": "Match",
            "user_a_dossier": {},
            "user_b_dossier": {},
            "crossref": {},
            "message": "Help me",
            "history": [],
        }

        with patch("app.main.llm_service") as mock_llm:
            mock_llm.coach_chat = AsyncMock(return_value="Be yourself!")

            resp = await async_client.post("/coach/chat", json=minimal)

        assert resp.status_code == 200
        assert resp.json()["reply"] == "Be yourself!"
