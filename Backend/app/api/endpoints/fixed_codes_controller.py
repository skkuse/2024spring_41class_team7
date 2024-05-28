from fastapi import APIRouter, FastAPI

from ...models.requests import FixedCodeRequest
from ...models.response import Response, ExceptionResponse, ListBody


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
    return Response(status="success",
                    onSuccess=mock_fixed_code_1(),
                    onError=None)

@router.get("/")
def get_fixed_codes():
    return Response(status="success",
                    onSuccess=ListBody(nItems=2, items=[mock_fixed_code_1(), mock_fixed_code_2()]),
                    onError=None)

@router.get("/{fixed_code_id}")
def get_one_fixed_code(fixed_code_id: int):
    return Response(status="success",
                    onSuccess=mock_fixed_code_1(),
                    onError=None)

@router.get("/strategy/{strategy_id}")
def get_one_fixed_code_by_strategy(strategy_id: int):
    return Response(status="success",
                    onSuccess=ListBody(nItems=2, items=[mock_fixed_code_1(), mock_fixed_code_3()]),
                    onError=None)

@router.get("/buggyCode/{buggy_code_id}")
def get_one_fixed_code_by_buggy_code(buggy_code_id: int):
    return Response(status="success",
                    onSuccess=ListBody(nItems=2, items=[mock_fixed_code_1(), mock_fixed_code_2()]),
                    onError=None)

@router.delete("/{fixed_code_id}")
def delete_fixed_code(fixed_code_id: int):
    return None

