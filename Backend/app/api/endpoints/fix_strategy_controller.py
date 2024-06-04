from fastapi import APIRouter
from ...models.requests import FixStrategyRequest
from ...domain.domains import FixStrategy
from ...models.response import Response, FixStrategyResponse, ListBody
from ...services.fix_strategy_service import FixStrategyService
from ...models.exceptions import *

router = APIRouter()

SUCCESS = "success"
FAIL = "fail"

@router.post('/')
def create_fix_strategy(fix_strategy: FixStrategyRequest):
    new_fix_strategy = FixStrategyService.create(FixStrategy.create(fix_strategy))
    return Response(
        status=SUCCESS,
        onSuccess=FixStrategyResponse.create(new_fix_strategy),
        onError=None)

@router.get('/')
def get_fix_strategy():
    find_fix_strategies = FixStrategyService.find_all()
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_fix_strategies),
            items=map(lambda fix_strategy: FixStrategyResponse.create(fix_strategy), find_fix_strategies)),
        onError=None
    )

@router.get("/{fix_strategy_id}")
def get_one_fix_strategy(fix_strategy_id: int):
    try:
        find_fix_strategy = FixStrategyService.find_one(fix_strategy_id)
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

