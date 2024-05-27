from fastapi import APIRouter

from Backend.app.models.requests import BuggyCodeRequest

router = APIRouter()

@router.post("/buggyCodes/")
def create_buggy_code(new_buggy_code: BuggyCodeRequest):
    return None

@router.get("/buggy_codes")
def get_buggy_codes():
    return None

@router.get("/buggyCodes/{buggy_code_id}")
def get_one_buggy_code(buggy_code_id: int):
    return None

