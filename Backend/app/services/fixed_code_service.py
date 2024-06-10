from ..domain.domains import FixedCode
from sqlalchemy.orm import Session
from ..repository.repository import FixedCodeRepository

class FixedCodeService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = FixedCodeRepository(db)
    def create(self, new_fixed_code: FixedCode):
        return self.repo.create(new_fixed_code)

    def find_one(self, id: int):
        return self.repo.findOne(id)

    def find_all(self):
        return self.repo.findAll()

    def find_all_by_strategy(self, strategy_id: int):
        return self.repo.findAllByStrategy(strategy_id)

    def find_all_by_buggy_code(self, buggy_code_id: int):
        return self.repo.findAllByBuggyCode(buggy_code_id)

    def delete_one(self, id: int):
        return self.repo.deleteOne(id)


