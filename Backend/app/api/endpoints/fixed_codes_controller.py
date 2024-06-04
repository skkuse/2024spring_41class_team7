from fastapi import APIRouter, FastAPI

from ...models.requests import FixedCodeRequest
from ...models.response import Response, ExceptionResponse, ListBody, FixedCodeResponse
from ...services.fixed_code_service import FixedCodeService
from ...domain.domains import FixedCode
from ...models.exceptions import *

app = FastAPI()

router = APIRouter()

# just pass test
####### TODO must be removed!!!! #########
def mock_fixed_code_1():
    return {
        "fixed_code_id": 1,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 1,
        "fix_strategy_id": 1
    }

def mock_fixed_code_2():
    return {
        "fixed_code_id": 2,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 1,
        "fix_strategy_id": 2
    }
def mock_fixed_code_3():
    return {
        "fixed_code_id": 3,
        "buggy_part": "buggy part",
        "fixed_part": "fixed part",
        "reduced_amount": 0.0,
        "reduced_rate": 0.0,
        "buggy_code_id": 2,
        "fix_strategy_id": 1
    }

###############

@router.post("/")
def create_fixed_code(fixed_code: FixedCodeRequest):
    new_fixed_code = FixedCodeService.create(FixedCode.create(fixed_code))
    return Response(status="success",
                    onSuccess=FixedCodeResponse.create(new_fixed_code),
                    onError=None)

@router.get("/")
def get_fixed_codes():
    fixed_codes = FixedCodeService.find_all()
    return Response(status="success",
                    onSuccess=ListBody(
                        nItems=len(fixed_codes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), fixed_codes)),
                    onError=None)

@router.get("/{fixed_code_id}")
def get_one_fixed_code(fixed_code_id: int):
    try:
        findFixedCode = FixedCodeService.find_one(fixed_code_id)
        return Response(status="success",
                        onSuccess=FixedCodeResponse.create(findFixedCode),
                        onError=None)
    except FileNotFoundError as e:
        exception_body = handle_DataNotFoundException(fixed_code_id)
        return Response(status="fail",
                        onSuccess=None,
                        onError=exception_body)

@router.get("/strategy/{strategy_id}")
def get_one_fixed_code_by_strategy(strategy_id: int):
    findFixedCodes = FixedCodeService.find_all_by_strategy(strategy_id)
    return Response(status="success",
                    onSuccess=ListBody(
                        nItems=len(findFixedCodes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), findFixedCodes)),
                    onError=None)

@router.get("/buggyCode/{buggy_code_id}")
def get_one_fixed_code_by_buggy_code(buggy_code_id: int):
    findFixedCodes = FixedCodeService.find_all_by_buggy_code(buggy_code_id)
    return Response(status="success",
                    onSuccess=ListBody(
                        nItems=len(findFixedCodes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), findFixedCodes)),
                    onError=None)

@router.delete("/{fixed_code_id}")
def delete_fixed_code(fixed_code_id: int):
    return None
