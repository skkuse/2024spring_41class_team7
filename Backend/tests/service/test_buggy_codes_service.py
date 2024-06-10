from datetime import datetime

import pytest
from _pytest.monkeypatch import MonkeyPatch
from fastapi.testclient import TestClient
from ...app.main import app
from ...app.models.response import Response, ListBody
from ...app.domain.domains import BuggyCode
from unittest.mock import patch, MagicMock
from ...app.services.buggy_codes_service import BuggyCodesService



@pytest.fixture
def mock_buggy_code_1():
    return BuggyCode(
        buggy_code_id=1,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)


@pytest.fixture
def  mock_buggy_code_2():
    return BuggyCode(
        buggy_code_id=2,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)


@pytest.fixture
def mock_buggy_code_3():
    return BuggyCode(
        buggy_code_id=3,
        code_text="code_text",
        created_at=datetime(2020, 1, 1),
        emission_amount=1.0,
        core_type="core_type", core_model="core_model", core_num=1, memory=1)
