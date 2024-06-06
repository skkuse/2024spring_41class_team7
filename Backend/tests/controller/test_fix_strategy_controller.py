import pytest
from fastapi.testclient import TestClient
from Backend.app.main import app
from Backend.app.models.response import Response, ListBody
from unittest.mock import patch
from Backend.app.domain.domains import FixStrategy

client = TestClient(app)

@pytest.fixture
def mock_fixStrategy_1():
    return FixStrategy(
        fix_strategy_id=1,
        description="description"
    )

@pytest.fixture
def mock_fixStrategy_json_1():
    return {
        "fix_strategy_id": 1,
        "description": "description"
    }

@pytest.fixture
def mock_fixStrategy_2():
    return FixStrategy(
        fix_strategy_id=2,
        description="description"
    )

@pytest.fixture
def mock_fixStrategy_json_2():
    return {
        "fix_strategy_id": 2,
        "description": "description"
    }

@patch("Backend.app.services.fix_strategy_service.FixStrategyService.create")
def test_create_fix_strategy(mock_create_fix_strategy, mock_fixStrategy_1, mock_fixStrategy_json_1):
    mock_create_fix_strategy.return_value = mock_fixStrategy_1

    response_raw = client.post("/api/fixStrategy", json=mock_fixStrategy_json_1)
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.onSuccess == mock_fixStrategy_json_1

@patch("Backend.app.services.fix_strategy_service.FixStrategyService.find_all")
def test_get_fix_strategy(mock_find_all,
                          mock_fixStrategy_1, mock_fixStrategy_json_1,
                          mock_fixStrategy_2, mock_fixStrategy_json_2):
    mock_find_all.return_value = [mock_fixStrategy_1, mock_fixStrategy_2]

    response_raw = client.get("/api/fixStrategy/")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert ListBody(**response.onSuccess).nItems == 2;
    assert ListBody(**response.onSuccess).items == [mock_fixStrategy_json_1, mock_fixStrategy_json_2]

@patch("Backend.app.services.fix_strategy_service.FixStrategyService.find_one")
def test_get_one_fix_strategy(mock_find_one, mock_fixStrategy_1, mock_fixStrategy_json_1):
    mock_find_one.return_value = mock_fixStrategy_1

    response_raw = client.get("/api/fixStrategy/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.onSuccess == mock_fixStrategy_json_1

@patch("Backend.app.services.fix_strategy_service.FixStrategyService.find_one")
def test_get_one_fix_strategy_not_found(mock_find_one):
    mock_find_one.side_effect = FileNotFoundError

    response_raw = client.get("/api/fixStrategy/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "fail"
    assert response.onError.exception == "DataNotFoundException"
    assert response.onError.message == "요청한 데이터를 데이터베이스에서 찾을 수 없습니다(id: 1)"
