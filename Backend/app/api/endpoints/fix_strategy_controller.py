from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...models.requests import FixStrategyRequest
from ...domain.domains import FixStrategy
from ...models.response import Response, FixStrategyResponse, ListBody
from ...services.fix_strategy_service import FixStrategyService
from ...models.exceptions import *
from ... import database

router = APIRouter()

SUCCESS = "success"
FAIL = "fail"

@router.post('/')
def create_fix_strategy(fix_strategy: FixStrategyRequest, db: Session = Depends(database.get_db)):
    fixStrategyService = FixStrategyService(db)
    new_fix_strategy = fixStrategyService.create(FixStrategy.create(fix_strategy))
    return Response(
        status=SUCCESS,
        onSuccess=FixStrategyResponse.create(new_fix_strategy),
        onError=None)

@router.get('/')
def get_fix_strategy(db: Session = Depends(database.get_db)):
    fixStrategyService = FixStrategyService(db)
    find_fix_strategies = fixStrategyService.find_all()
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_fix_strategies),
            items=map(lambda fix_strategy: FixStrategyResponse.create(fix_strategy), find_fix_strategies)),
        onError=None
    )

@router.get("/{fix_strategy_id}")
def get_one_fix_strategy(fix_strategy_id: int, db: Session = Depends(database.get_db)):
    try:
        fixStrategyService = FixStrategyService(db)
        find_fix_strategy = fixStrategyService.find_one(fix_strategy_id)
        if find_fix_strategy is None: raise FileNotFoundError
        return Response(
            status=SUCCESS,
            onSuccess=FixStrategyResponse.create(find_fix_strategy),
            onError=None)
    except FileNotFoundError:
        exception_body = handle_DataNotFoundException(fix_strategy_id)
        return Response(
            status=FAIL,
            onSuccess=None,
            onError=exception_body)

