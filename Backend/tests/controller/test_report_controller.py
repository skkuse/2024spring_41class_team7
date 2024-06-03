from datetime import datetime
import pytest
from fastapi.testclient import TestClient
from Backend.app.main import app
from Backend.app.models.response import Response, ListBody
from Backend.app.domain.domains import FixedCode, Report
from unittest.mock import patch

client = TestClient(app)

@pytest.fixture
def mock_report_json_1():
    return {
        "report_id": 1,
        "description": "description",
        "created_at": "2020-01-01",
        "fixed_code_id": 1,
    }
@pytest.fixture
def mock_report_1():
    return Report(
        report_id=1,
        description="description",
        created_at=datetime(2020, 1, 1),
        fixed_code_id=1,
        fixed_code= FixedCode(fixed_code_id=1)
    )

@pytest.fixture
def mock_report_json_2():
    return {
        "report_id": 2,
        "description": "description",
        "created_at": "2020-01-01",
        "fixed_code_id": 1,
    }
@pytest.fixture
def mock_report_2():
    return Report(
        report_id=2,
        description="description",
        created_at=datetime(2020, 1, 1),
        fixed_code_id=1,
        fixed_code= FixedCode(fixed_code_id=1)
    )

@pytest.fixture
def mock_report_json_3():
    return {
        "report_id": 3,
        "description": "description",
        "created_at": "2020-01-01",
        "fixed_code_id": 2,
    }
@pytest.fixture
def mock_report_3():
    return Report(
        report_id=3,
        description="description",
        created_at=datetime(2020, 1, 1),
        fixed_code_id=2,
        fixed_code= FixedCode(fixed_code_id=2)
    )

@patch("Backend.app.services.report_service.ReportService.create")
def test_create_report(mock_create_report, mock_report_1, mock_report_json_1):
    mock_create_report.return_value = mock_report_1

    response_raw = client.post("/api/reports/", json=mock_report_json_1)
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert response.onSuccess == mock_report_json_1

@patch("Backend.app.services.report_service.ReportService.find_all")
def test_get_reports(mock_find_all, mock_report_1, mock_report_2, mock_report_json_1, mock_report_json_2):
    mock_find_all.return_value = [mock_report_1, mock_report_2]

    response_raw = client.get("/api/reports/")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert ListBody(**response.onSuccess).nItems == 2
    assert ListBody(**response.onSuccess).items == [mock_report_json_1, mock_report_json_2]

@patch("Backend.app.services.report_service.ReportService.find_one")
def test_get_one_report(mock_find_one, mock_report_1, mock_report_json_1):
    mock_find_one.return_value = mock_report_1

    response_raw = client.get("/api/reports/1/")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert response.onSuccess == mock_report_json_1

@patch("Backend.app.services.report_service.ReportService.find_one")
def test_get_one_report_not_found(mock_find_one, mock_report_1, mock_report_json_1):
    mock_find_one.side_effect = FileNotFoundError

    response_raw = client.get("/api/reports/1/")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "fail"
    assert response.onError.exception == "DataNotFoundException"
    assert response.onError.message == "요청한 데이터를 데이터베이스에서 찾을 수 없습니다(id: 1)"

@patch("Backend.app.services.report_service.ReportService.find_all_by_fixed_code")
def test_get_reports_by_fixed_code(mock_find_all_by_fixed_code,
                                   mock_report_1, mock_report_json_1,
                                   mock_report_2, mock_report_json_2):
    mock_find_all_by_fixed_code.return_value = [mock_report_1, mock_report_2]

    response_raw = client.get("/api/reports/fixedCode/1")
    response = Response(**response_raw.json())

    assert response_raw.status_code == 200
    assert response.status == "success"
    assert ListBody(**response.onSuccess).nItems == 2
    assert ListBody(**response.onSuccess).items == [mock_report_json_1, mock_report_json_2]

@patch("Backend.app.services.report_service.ReportService.delete_one")
def test_delete_report(mock_delete_one):
    mock_delete_one.return_value = 1

    response_raw = client.delete("/api/reports/1/")
    assert response_raw.status_code == 200

@patch("Backend.app.services.report_service.ReportService.delete_all_by_fixed_code")
def test_delete_reports_by_fixed_code(mock_delete_all_by_fixed_code):
    mock_delete_all_by_fixed_code.return_value = [1, 2]

    response_raw = client.delete("/api/reports/fixedCode/1")
    assert response_raw.status_code == 200

