import pytest
from fastapi.testclient import TestClient
from werkzeug.exceptions import NotFound

from Backend.app.main import app
from Backend.app.models.response import Response, ListBody
from unittest.mock import patch

from Backend.app.domain.domains import FixedCode

client = TestClient(app)

@pytest.fixture
def mock_fixed_code_json_1():
    return {
        "fixed_code_id": 1,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 1,
        "fix_strategy_id": 1
    }

@pytest.fixture
def mock_fixed_code_1():
    return FixedCode(
        fixed_code_id=1,
        buggy_part="buggy part",
        fixed_part="fixed part",
        reduced_amount=0.0,
        reduced_rate=0.0,
        buggy_code_id=1,
        fix_strategy_id=1
    )

@pytest.fixture
def mock_fixed_code_json_2():
    return {
        "fixed_code_id": 2,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 1,
        "fix_strategy_id": 2
    }

@pytest.fixture
def mock_fixed_code_2():
    return FixedCode(
        fixed_code_id=2,
        buggy_part="buggy part",
        fixed_part="fixed part",
        reduced_amount=0.0,
        reduced_rate=0.0,
        buggy_code_id=1,
        fix_strategy_id=2
    )

@pytest.fixture
def mock_fixed_code_json_3():
    return {
        "fixed_code_id": 3,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 2,
        "fix_strategy_id": 1
    }

@pytest.fixture
def mock_fixed_code_3():
    return FixedCode(
        fixed_code_id=3,
        buggy_part="buggy part",
        fixed_part="fixed part",
        reduced_amount=0.0,
        reduced_rate=0.0,
        buggy_code_id=2,
        fix_strategy_id=1
    )


# 생성
@patch("Backend.app.services.fixed_code_service.FixedCodeService.create")
def test_create_fixed_code(mock_create, mock_fixed_code_1, mock_fixed_code_json_1):
    mock_create.return_value = mock_fixed_code_1

    response_raw = client.post("/api/fixedCodes/", json=mock_fixed_code_json_1)
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert response.onSuccess == mock_fixed_code_json_1

# 전체 조회
@patch("Backend.app.services.fixed_code_service.FixedCodeService.find_all")
def test_get_fixed_codes(mock_find_all, mock_fixed_code_1, mock_fixed_code_2,
                         mock_fixed_code_json_1, mock_fixed_code_json_2):
    mock_find_all.return_value = [mock_fixed_code_1, mock_fixed_code_2]

    response_raw = client.get("/api/fixedCodes")
    assert response_raw.status_code == 200

    response = Response(**response_raw.json())
    assert response.status == "success"
    assert ListBody(**response.onSuccess).nItems == 2
    assert ListBody(**response.onSuccess).items == [mock_fixed_code_json_1, mock_fixed_code_json_2]

# 단건 조회
@patch("Backend.app.services.fixed_code_service.FixedCodeService.find_one")
def test_get_one_fixed_code(mock_find_one, mock_fixed_code_1, mock_fixed_code_json_1):
    mock_find_one.return_value = mock_fixed_code_1

    response_raw = client.get("/api/fixedCodes/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert response.onSuccess == mock_fixed_code_json_1

# 단건 조회 예외
@patch("Backend.app.services.fixed_code_service.FixedCodeService.find_one")
def test_get_one_fixed_code_not_found(mock_find_one):
    mock_find_one.side_effect = FileNotFoundError

    response_raw = client.get("/api/fixedCodes/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "fail"
    assert response.onError.exception == "DataNotFoundException"
    assert response.onError.message == "요청한 데이터를 데이터베이스에서 찾을 수 없습니다(id: 1)"



# buggy code 별 검색
@patch("Backend.app.services.fixed_code_service.FixedCodeService.find_all_by_buggy_code")
def test_get_one_fixed_code_by_buggy_code(mock_find_all_by_buggy_code, mock_fixed_code_1, mock_fixed_code_2,
                                          mock_fixed_code_json_1, mock_fixed_code_json_2):
    mock_find_all_by_buggy_code.return_value = [mock_fixed_code_1, mock_fixed_code_2]

    response_raw = client.get("/api/fixedCodes/buggyCode/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert ListBody(**response.onSuccess).nItems == 2
    assert ListBody(**response.onSuccess).items == [mock_fixed_code_json_1, mock_fixed_code_json_2]

# fix strategy 별 검색
@patch("Backend.app.services.fixed_code_service.FixedCodeService.find_all_by_strategy")
def test_get_one_fixed_code_by_strategy(mock_find_all_by_strategy, mock_fixed_code_1, mock_fixed_code_3,
                                        mock_fixed_code_json_1, mock_fixed_code_json_3):
    mock_find_all_by_strategy.return_value = [mock_fixed_code_1, mock_fixed_code_3]

    response_raw = client.get("/api/fixedCodes/strategy/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert ListBody(**response.onSuccess).nItems == 2
    assert ListBody(**response.onSuccess).items == [mock_fixed_code_json_1, mock_fixed_code_json_3]

# 삭제 테스트 어떻게?
