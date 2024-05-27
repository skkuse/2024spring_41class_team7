from fastapi import APIRouter

from Backend.app.models.requests import FixedCodeRequest

router = APIRouter()

@router.post("/fixedCodes")
def create_fixed_code(fixed_code: FixedCodeRequest):
    return None

@router.get("/fixedCodes/")
def get_fixed_codes():
    return None

@router.get("/fixedCodes/{fixed_code_id}")
def get_one_fixed_code(fixed_code_id: int):
    return None

@router.get("/fixedCodes/strategy/{strategy_id}")
def get_one_fixed_code_by_strategy(strategy_id: int):
    return None

@router.get("/fixedCodes/buggyCode/{buggy_code_id}")
def get_one_fixed_code_by_buggy_code(buggy_code_id: int):
    return None

@router.delete("/fixedCodes/{fixed_code_id}")
def delete_fixed_code(fixed_code_id: int):
    return None

