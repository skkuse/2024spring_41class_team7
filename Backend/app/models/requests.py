from pydantic import BaseModel
from typing import Optional

class FixedCodeRequest(BaseModel):
    buggy_part: str
    fixed_part: str
    reduced_amount: float
    reduced_rate: float
    buggy_code_id: int
    fix_strategy_id: int

class BuggyCodeRequest(BaseModel):
    code_text: str
    emission_amount: float
    core_type: str
    core_model: str
    core_num: int
    memory: int

class FixStrategyRequest(BaseModel):
    description: str

class ReportRequest(BaseModel):
    description: str
    fixed_code_id: int
