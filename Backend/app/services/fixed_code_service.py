from ..domain.domains import FixedCode
from sqlalchemy.orm import Session
from ..repository.repository import FixedCodeRepository, BuggyCodeRepository

class FixedCodeService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = FixedCodeRepository(db)
        self.buggyCodeRepo = BuggyCodeRepository(db)
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

    def find_all_by_date(self, date: str):
        all_fixed_codes = self.repo.findAll()
        find_buggy_codes = self.buggyCodeRepo.findAllByDate(date)
        ret = []
        for buggy_code in find_buggy_codes:
            for fixed_code in all_fixed_codes:
                if fixed_code.buggy_code_id == buggy_code.buggy_code_id:
                    ret.append(fixed_code)
        return ret

    def rank_with_strategy(self, strategy_id: int, nRank: int):
        allFixedCodeWithStrategy = self.repo.findAllByStrategy(strategy_id)
        sortedFixedCodes = sorted(allFixedCodeWithStrategy, key=lambda x: x.reduced_rate, reverse=True)
        if nRank < len(allFixedCodeWithStrategy):
            return sortedFixedCodes[:nRank]
        return sortedFixedCodes


    def delete_one(self, id: int):
        return self.repo.deleteOne(id)


