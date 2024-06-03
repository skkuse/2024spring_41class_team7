import datetime

from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

from ..models.requests import *

Base = declarative_base()

class BuggyCode(Base):
    __tablename__ = 'buggy_code'
    buggy_code_id = Column(Integer, primary_key=True, autoincrement=True)
    code_text = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)
    emission_amount = Column(Float, nullable=False)
    core_type = Column(String(10), nullable=False)
    core_model = Column(String(100), nullable=False)
    core_num = Column(Integer, nullable=False)
    memory = Column(Integer, nullable=False)
    fixed_codes = relationship("FixedCode", back_populates="buggy_code")

    @staticmethod
    def create(buggy_code_req: BuggyCodeRequest):
        return BuggyCode(
            code_text=buggy_code_req.code_text,
            created_at=datetime.datetime.now(),
            emission_amount=buggy_code_req.emission_amount,
            core_type=buggy_code_req.core_type,
            core_model=buggy_code_req.core_model,
            core_num=buggy_code_req.core_num,
            memory=buggy_code_req.memory
        )

class FixedCode(Base):
    __tablename__ = 'fixed_code'
    fixed_code_id = Column(Integer, primary_key=True, autoincrement=True)
    buggy_part = Column(Text, nullable=False)
    fixed_part = Column(Text, nullable=False)
    reduced_amount = Column(Float)
    reduced_rate = Column(Float)
    buggy_code_id = Column(Integer, ForeignKey('buggy_code.buggy_code_id'), nullable=False)
    buggy_code = relationship("BuggyCode", back_populates="fixed_codes")
    fix_strategy_id = Column(Integer, ForeignKey('fix_strategy.fix_strategy_id'), nullable=False)
    fix_strategy = relationship("FixStrategy", back_populates="fixed_codes")
    reports = relationship("Report", back_populates="fixed_code")

    @staticmethod
    def create(fixed_code_req: FixedCodeRequest):
        return FixedCode(
            buggy_part=fixed_code_req.buggy_part,
            fixed_part=fixed_code_req.fixed_part,
            reduced_amount=fixed_code_req.reduced_amount,
            reduced_rate=fixed_code_req.reduced_rate,
            buggy_code_id=fixed_code_req.buggy_code_id,
            fix_strategy_id=fixed_code_req.fix_strategy_id
        )

class FixStrategy(Base):
    __tablename__ = 'fix_strategy'
    fix_strategy_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text)
    fixed_codes = relationship("FixedCode", back_populates="fix_strategy")

    @staticmethod
    def create(fix_strategy_req: FixStrategyRequest):
        return FixStrategy(description=fix_strategy_req.description)

class Report(Base):
    __tablename__ = 'report'
    report_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)
    fixed_code_id = Column(Integer, ForeignKey('fixed_code.fixed_code_id'), nullable=False)
    fixed_code = relationship("FixedCode", back_populates="reports")

    @staticmethod
    def create(report_req: ReportRequest):
        return Report(
            description=report_req.description,
            created_at=datetime.datetime.now(),
            fixed_code_id=report_req.fixed_code_id
        )

