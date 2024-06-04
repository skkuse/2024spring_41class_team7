from datetime import datetime

import pytest
from _pytest.monkeypatch import MonkeyPatch
from fastapi.testclient import TestClient
from ...app.main import app
from ...app.models.response import Response, ListBody
from ...app.domain.domains import BuggyCode
from unittest.mock import patch, MagicMock
from ...app.services.buggy_codes_service import BuggyCodesService

client = TestClient(app)

# code_text: str
# created_at : date
# emission_amount: float
# core_type: str
# core_model: str
# core_num: int
# memory: int

@pytest.fixture
def mock_buggy_code_json_1():
    return {
    "buggy_code_id": 1,
    "code_text": "code_text",
    "create_at": "2020-01-01",
    "emission_amount": 1.0,
    "core_type": "core_type",
    "core_model": "core_model",
    "core_num": 1,
    "memory": 1
}

@pytest.fixture
def mock_buggy_code_1():
    return BuggyCode(
        buggy_code_id=1,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)

@pytest.fixture
def mock_buggy_code_json_2():
    return {
    "buggy_code_id": 2,
    "code_text": "code_text",
    "create_at": "2020-01-01",
    "emission_amount": 1.0,
    "core_type": "core_type",
    "core_model": "core_model",
    "core_num": 1,
    "memory": 1
}
@pytest.fixture
def  mock_buggy_code_2():
    return BuggyCode(
        buggy_code_id=2,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)

@pytest.fixture
def mock_buggy_code_json_3():
    return {
        "buggy_code_id": 3,
        "code_text": "code_text",
        "create_at": "2020-01-01",
        "emission_amount": 1.0,
        "core_type": "core_type",
        "core_model": "core_model",
        "core_num": 1,
        "memory": 1
    }

@pytest.fixture
def mock_buggy_code_3():
    return BuggyCode(
        buggy_code_id=3,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)

def mock_create(new_buggy_code: BuggyCode): return mock_buggy_code_1

@patch("Backend.app.services.buggy_codes_service.BuggyCodesService.create")
def test_create_buggy_code(mock_create, mock_buggy_code_1, mock_buggy_code_json_1):
    mock_create.return_value = mock_buggy_code_1

    response_raw = client.post("/api/buggyCodes/", json=mock_buggy_code_json_1)
    assert response_raw.status_code == 200
    response = Response(**response_raw.json())

    assert response.status == "success"
    assert response.onSuccess == mock_buggy_code_json_1

@patch("Backend.app.services.buggy_codes_service.BuggyCodesService.find_all")
def test_get_all_buggy_code(mock_find_all,
                           mock_buggy_code_1, mock_buggy_code_2, mock_buggy_code_3,
                           mock_buggy_code_json_1, mock_buggy_code_json_2, mock_buggy_code_json_3):
    mock_find_all.return_value = [mock_buggy_code_1, mock_buggy_code_2, mock_buggy_code_3]

    response_raw = client.get("/api/buggyCodes")
    response = Response(**response_raw.json())


    assert response_raw.status_code == 200
    assert response.status == "success"
    assert ListBody(**response.onSuccess).nItems == 3
    assert (ListBody(**response.onSuccess).items ==
            [mock_buggy_code_json_1, mock_buggy_code_json_2, mock_buggy_code_json_3])

@patch("Backend.app.services.buggy_codes_service.BuggyCodesService.find_one")
def test_get_one_buggy_code(mock_find_one, mock_buggy_code_1, mock_buggy_code_json_1):
    mock_find_one.return_value = mock_buggy_code_1

    response_raw = client.get("/api/buggyCodes/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert response.onSuccess == mock_buggy_code_json_1

@patch("Backend.app.services.buggy_codes_service.BuggyCodesService.find_one")
def test_get_one_buggy_code_not_found(mock_find_one):
    mock_find_one.side_effect = FileNotFoundError

    response_raw = client.get("/api/buggyCodes/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "fail"
    assert response.onError.exception == "DataNotFoundException"
    assert response.onError.message == "요청한 데이터를 데이터베이스에서 찾을 수 없습니다(id: 1)"
