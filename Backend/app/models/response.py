import datetime

from pydantic import BaseModel
from typing import Optional

from ..domain.domains import *

class ExceptionResponse(BaseModel):
    exception: str
    message: str

class Response(BaseModel):
    status: str
    onSuccess: Optional[object]
    onError: Optional[ExceptionResponse]

class ListBody(BaseModel):
    nItems: int
    items: list

class BuggyCodeResponse(BaseModel):
    buggy_code_id: int
    code_text: str
    fixed_code_text: str
    create_at: datetime
    emission_amount: float
    core_type: str
    core_model: str
    core_num: int
    memory: int
    class Config:
        arbitrary_types_allowed = True

    @staticmethod
    def create(buggyCode: BuggyCode):
        return BuggyCodeResponse(
            buggy_code_id=buggyCode.buggy_code_id,
            code_text=buggyCode.code_text,
            fixed_code_text=buggyCode.fixed_code_text,
            create_at=buggyCode.created_at.strftime("%Y-%m-%d"),
            emission_amount=buggyCode.emission_amount,
            core_type=buggyCode.core_type,
            core_model=buggyCode.core_model,
            core_num=buggyCode.core_num,
            memory=buggyCode.memory
        )

class FixedCodeResponse(BaseModel):
    fixed_code_id: int
    fixed_code_text: str
    buggy_part: str
    fixed_part: str
    reduced_amount: float
    reduced_rate: float
    buggy_code_id: int
    fix_strategy_id: int

    class Config:
        arbitrary_types_allowed = True

    @staticmethod
    def create(fixedCode: FixedCode):
        return FixedCodeResponse(
            fixed_code_id=fixedCode.fixed_code_id,
            fixed_code_text=fixedCode.fixed_code_text,
            buggy_part=fixedCode.buggy_part,
            fixed_part=fixedCode.fixed_part,
            reduced_amount=fixedCode.reduced_amount,
            reduced_rate=fixedCode.reduced_rate,
            buggy_code_id=fixedCode.buggy_code_id,
            fix_strategy_id=fixedCode.fix_strategy_id
        )

class FixStrategyResponse(BaseModel):
    fix_strategy_id: int
    description: str

    class Config:
        arbitrary_types_allowed = True

    @staticmethod
    def create(fixStrategy: FixStrategy):
        return FixStrategyResponse(
            fix_strategy_id=fixStrategy.fix_strategy_id,
            description=fixStrategy.description)

class ReportResponse(BaseModel):
    report_id: int
    description: str
    created_at: datetime
    fixed_code_id: int

    class Config:
        arbitrary_types_allowed = True

    @staticmethod
    def create(report: Report):
        return ReportResponse(
            report_id=report.report_id,
            description=report.description,
            created_at=report.created_at.strftime("%Y-%m-%d"),
            fixed_code_id=report.fixed_code_id)
