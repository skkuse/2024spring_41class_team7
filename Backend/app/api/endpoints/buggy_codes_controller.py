from datetime import datetime

from fastapi import APIRouter, FastAPI, Depends
from sqlalchemy.orm import Session
from ...domain.domains import BuggyCode
from ...models.requests import BuggyCodeRequest
from ...services.buggy_codes_service import BuggyCodesService
from ...models.response import *
from ...models.exceptions import *
from ... import database

app = FastAPI()

router = APIRouter()

SUCCESS = "success"
FAIL = "fail"



@router.post("/")
def req_create_buggy_code(new_buggy_code_req: BuggyCodeRequest, db: Session = Depends(database.get_db)):
    buggyCodesService = BuggyCodesService(db)
    new_buggy_code = buggyCodesService.create(BuggyCode.create(new_buggy_code_req))

    return Response(
        status=SUCCESS,
        onSuccess=BuggyCodeResponse.create(new_buggy_code),
        onError=None
    )
@router.get("/")
def get_buggy_codes(db: Session = Depends(database.get_db)):
    buggyCodesService = BuggyCodesService(db)
    findBuggyCodes = buggyCodesService.find_all()

    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(findBuggyCodes),
            items=map(lambda buggyCoodes: BuggyCodeResponse.create(buggyCoodes), findBuggyCodes)
        ),
        onError=None
    )

@router.get("/{buggy_code_id}")
def get_one_buggy_code(buggy_code_id: int, db: Session = Depends(database.get_db)):
    try:
        buggyCodesService = BuggyCodesService(db)
        findBuggyCode = buggyCodesService.find_one(buggy_code_id)
        if findBuggyCode is None: raise FileNotFoundError
        return Response(
            status=SUCCESS,
            onSuccess=BuggyCodeResponse.create(findBuggyCode),
            onError=None)
    except FileNotFoundError as e:
        exception_body = handle_DataNotFoundException(buggy_code_id)
        return Response(
            status=FAIL,
            onSuccess=None,
            onError=exception_body)

