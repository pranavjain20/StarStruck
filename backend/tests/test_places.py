"""Tests for PlacesService."""
import pytest
from unittest.mock import AsyncMock, patch, MagicMock


class TestPlacesService:
    @pytest.mark.asyncio
    async def test_no_api_key_returns_mock(self):
        with patch("app.services.places.settings") as mock_settings:
            mock_settings.google_maps_api_key = ""

            from app.services.places import PlacesService
            svc = PlacesService()
            svc.api_key = ""
            result = await svc.search_venue("jazz club")

        assert len(result) == 1
        assert "Mock" in result[0]["name"]
        assert result[0]["address"] == "123 Discovery Way"

    @pytest.mark.asyncio
    async def test_api_error_returns_empty(self):
        mock_resp = MagicMock()
        mock_resp.status_code = 500
        mock_resp.text = "Internal Server Error"

        mock_client = AsyncMock()
        mock_client.post = AsyncMock(return_value=mock_resp)
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)

        with patch("app.services.places.settings") as mock_settings, \
             patch("app.services.places.httpx.AsyncClient", return_value=mock_client):
            mock_settings.google_maps_api_key = "fake-key"

            from app.services.places import PlacesService
            svc = PlacesService()
            svc.api_key = "fake-key"
            result = await svc.search_venue("jazz club", location="NYC")

        assert result == []

    @pytest.mark.asyncio
    async def test_formats_results(self):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "places": [
                {
                    "displayName": {"text": "Blue Note"},
                    "formattedAddress": "131 W 3rd St",
                    "rating": 4.5,
                    "priceLevel": "MODERATE",
                    "types": ["bar", "live_music"],
                    "regularOpeningHours": {"weekdayDescriptions": ["Mon: 7PM-2AM"]},
                }
            ]
        }

        mock_client = AsyncMock()
        mock_client.post = AsyncMock(return_value=mock_resp)
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)

        with patch("app.services.places.settings") as mock_settings, \
             patch("app.services.places.httpx.AsyncClient", return_value=mock_client):
            mock_settings.google_maps_api_key = "fake-key"

            from app.services.places import PlacesService
            svc = PlacesService()
            svc.api_key = "fake-key"
            result = await svc.search_venue("jazz club")

        assert len(result) == 1
        assert result[0]["name"] == "Blue Note"
        assert result[0]["address"] == "131 W 3rd St"
        assert result[0]["rating"] == 4.5

    @pytest.mark.asyncio
    async def test_includes_location_in_query(self):
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {"places": []}

        mock_client = AsyncMock()
        mock_client.post = AsyncMock(return_value=mock_resp)
        mock_client.__aenter__ = AsyncMock(return_value=mock_client)
        mock_client.__aexit__ = AsyncMock(return_value=False)

        with patch("app.services.places.settings") as mock_settings, \
             patch("app.services.places.httpx.AsyncClient", return_value=mock_client):
            mock_settings.google_maps_api_key = "fake-key"

            from app.services.places import PlacesService
            svc = PlacesService()
            svc.api_key = "fake-key"
            await svc.search_venue("jazz club", location="Brooklyn")

        call_args = mock_client.post.call_args
        assert "Brooklyn" in call_args.kwargs["json"]["textQuery"]
