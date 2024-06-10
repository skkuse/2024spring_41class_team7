from sqlalchemy.orm import Session


class BuggyCodeRepository:
    def __init__(self, db:Session):
        self.db = db

class FixedCodeRepository:
    def __init__(self, db:Session):
        self.db = db

class FixStrategyRepository:
    def __init__(self, db:Session):
        self.db = db

class ReportRepository:
    def __init__(self, db:Session):
        self.db = db
