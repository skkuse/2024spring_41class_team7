from fastapi import APIRouter
from ...models.requests import FixStrategyRequest

router = APIRouter()

@router.post('/fixStrategy/')
def create_fix_strategy(fix_strategy: FixStrategyRequest):
    return None

@router.get('/fixStrategy')
def get_fix_strategy():
    return None

@router.get("/fixStrategy/{fix_strategy_id}")
def get_one_fix_strategy(fix_strategy_id: int):
    return None

