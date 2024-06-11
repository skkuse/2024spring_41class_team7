from ..models.requests import FixStrategyRequest
from ..domain.domains import FixStrategy
from sqlalchemy.orm import Session
from ..repository.repository import FixStrategyRepository

class FixStrategyService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = FixStrategyRepository(db)
    def create(self, new_fixStrategy: FixStrategy):
        return self.repo.create(new_fixStrategy)

    def find_all(self):
        return self.repo.findAll()

    def find_one(self, id: int):
        return self.repo.findOne(id)
