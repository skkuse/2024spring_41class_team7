from sqlalchemy.orm import Session
from ..domain.domains import BuggyCode
from ..repository.repository import BuggyCodeRepository

import sys
class BuggyCodesService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = BuggyCodeRepository(db)
    def create(self, buggyCode: BuggyCode) -> BuggyCode:
        return self.repo.create(buggyCode)
    def find_all(self):
        return self.repo.findAll()

    def find_one(self, id: int):
        return self.repo.findOne(id=id)
