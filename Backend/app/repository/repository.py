from sqlalchemy.orm import Session
from sqlalchemy import cast, Date
from ..domain.domains import  *


class BuggyCodeRepository:
    def __init__(self, db:Session):
        self.db = db
    def findAll(self):
        return self.db.query(BuggyCode).all()
    def findOne(self, id: int):
        print(f"User ID: {id}")
        return self.db.query(BuggyCode).filter(BuggyCode.buggy_code_id == id).first()

    def create(self, buggy_code):
        self.db.add(buggy_code)
        self.db.commit()
        self.db.refresh(buggy_code)
        return buggy_code

    def findAllByDate(self, date: str):
        return self.db.query(BuggyCode).filter(cast(BuggyCode.created_at, Date) == date).all()

class FixedCodeRepository:
    def __init__(self, db:Session):
        self.db = db

    def create(self, fixed_code):
        self.db.add(fixed_code)
        self.db.commit()
        self.db.refresh(fixed_code)
        return fixed_code

    def findAll(self):
        return self.db.query(FixedCode).all()

    def findOne(self, id: int):
        return self.db.query(FixedCode).filter(FixedCode.fixed_code_id == id).first()

    def findAllByBuggyCode(self, buggy_code_id: int):
        return self.db.query(FixedCode).filter(FixedCode.buggy_code_id == buggy_code_id).all()

    def findAllByStrategy(self, fix_strategy_id: int):
        return self.db.query(FixedCode).filter(FixedCode.fix_strategy_id == fix_strategy_id).all()

    def deleteOne(self, id: int):
        deleted_code = self.repo.findOne(id)
        if deleted_code:
            self.repo.delete(deleted_code)
            self.db.commit()
            return True
        return False


class FixStrategyRepository:
    def __init__(self, db:Session):
        self.db = db

    def create(self, fix_strategy: FixStrategy):
        self.db.add(fix_strategy)
        self.db.commit()
        self.db.refresh(fix_strategy)
        return fix_strategy

    def findOne(self, id: int):
        return self.db.query(FixStrategy).filter(FixStrategy.fix_strategy_id == id).first()

    def findAll(self):
        return self.db.query(FixStrategy).all()

class ReportRepository:
    def __init__(self, db:Session):
        self.db = db

    def create(self, report):
        self.db.add(report)
        self.db.commit()
        self.db.refresh(report)
        return report

    def findAll(self):
        return self.db.query(Report).all()

    def findOne(self, id: int):
        return self.db.query(Report).filter(Report.report_id == id).first()

    def findAllByFixedCode(self, fixed_code_id: int):
        return self.db.query(Report).filter(Report.fixed_code_id == fixed_code_id).all()

    def deleteOne(self, id: int):
        deleted_report = self.db.query(Report).filter(Report.report_id == id).first()
        if deleted_report:
            self.db.delete(deleted_report)
            self.db.commit()
            return True
        return False

    def deleteAllByFixedCode(self, fixed_code_id: int):
        deleted_reports = self.db.query(Report).filter(Report.fixed_code_id == fixed_code_id).all()
        for deleted_report in deleted_reports:
            self.db.delete(deleted_report)
            self.db.commit()
        return True
