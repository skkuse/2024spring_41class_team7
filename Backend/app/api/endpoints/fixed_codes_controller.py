from fastapi import APIRouter, FastAPI, Depends
from sqlalchemy.orm import Session

from ...models.requests import FixedCodeRequest
from ...models.response import Response, ExceptionResponse, ListBody, FixedCodeResponse
from ...services.fixed_code_service import FixedCodeService
from ...domain.domains import FixedCode
from ...models.exceptions import *
from ... import database

app = FastAPI()

router = APIRouter()


@router.post("/")
def create_fixed_code(fixed_code: FixedCodeRequest, db: Session = Depends(database.get_db)):
    fixedCodeService = FixedCodeService(db)
    new_fixed_code = fixedCodeService.create(FixedCode.create(fixed_code))
    return Response(status="success",
                    onSuccess=FixedCodeResponse.create(new_fixed_code),
                    onError=None)

@router.get("/")
def get_fixed_codes(db: Session = Depends(database.get_db)):
    fixedCodeService = FixedCodeService(db)
    fixed_codes = fixedCodeService.find_all()
    return Response(status="succ`ess",
                    onSuccess=ListBody(
                        nItems=len(fixed_codes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), fixed_codes)),
                    onError=None)

@router.get("/{fixed_code_id}")
def get_one_fixed_code(fixed_code_id: int, db: Session = Depends(database.get_db)):
    try:
        fixedCodeService = FixedCodeService(db)
        findFixedCode = fixedCodeService.find_one(fixed_code_id)
        if findFixedCode is None: raise FileNotFoundError
        return Response(status="success",
                        onSuccess=FixedCodeResponse.create(findFixedCode),
                        onError=None)
    except FileNotFoundError as e:
        exception_body = handle_DataNotFoundException(fixed_code_id)
        return Response(status="fail",
                        onSuccess=None,
                        onError=exception_body)

@router.get("/strategy/{strategy_id}")
def get_one_fixed_code_by_strategy(strategy_id: int, db: Session = Depends(database.get_db)):
    fixedCodeService = FixedCodeService(db)
    findFixedCodes = fixedCodeService.find_all_by_strategy(strategy_id)
    return Response(status="success",
                    onSuccess=ListBody(
                        nItems=len(findFixedCodes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), findFixedCodes)),
                    onError=None)

@router.get("/buggyCode/{buggy_code_id}")
def get_one_fixed_code_by_buggy_code(buggy_code_id: int, db: Session = Depends(database.get_db)):
    fixedCodeService = FixedCodeService(db)
    findFixedCodes = fixedCodeService.find_all_by_buggy_code(buggy_code_id)
    return Response(status="success",
                    onSuccess=ListBody(
                        nItems=len(findFixedCodes),
                        items=map(lambda fixed_code: FixedCodeResponse.create(fixed_code), findFixedCodes)),
                    onError=None)

@router.delete("/{fixed_code_id}")
def delete_fixed_code(fixed_code_id: int, db: Session = Depends(database.get_db)):
    try:
        fixedCodeService = FixedCodeService(db)
        result = fixedCodeService.delete(fixed_code_id)
        if not result: raise FileNotFoundError
        return Response(status="success",
                        onSuccess=None,
                        onError=None)
    except:
        exception_body = handle_DataNotFoundException(fixed_code_id)
        return Response(status="fail",
                        onSuccess=None,
                        onError=exception_body)
