from ..domain.domains import Report
from sqlalchemy.orm import Session

from ..repository.repository import ReportRepository

class ReportService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = ReportRepository(db)
    def create(self, new_report: Report):
        return self.repo.create(new_report)

    def find_all(self):
        return self.repo.findAll()

    def find_one(self, id: int):
        return self.repo.findOne(id)

    def find_all_by_fixed_code(self, fixed_code_id: int):
        return self.repo.findAllByFixedCode(fixed_code_id)

    def delete_one(self, id: int):
        return self.repo.deleteOne(id)

    def delete_all_by_fixed_code(self, fixed_code_id: int):
        return self.repo.deleteAllByFixedCode(fixed_code_id)
