from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

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

class FixStrategy(Base):
    __tablename__ = 'fix_strategy'
    fix_strategy_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text)
    fix_codes = relationship("FixedCode", back_populates="fix_strategy")

class Report(Base):
    __tablename__ = 'report'
    report_id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False)
    fixed_code_id = Column(Integer, ForeignKey('fixed_code.fixed_code_id'), nullable=False)
    fixed_code = relationship("FixedCode", back_populates="reports")

