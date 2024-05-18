from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.carbon_calculator import calculate_carbon_emission

router = APIRouter()

class CodeInput(BaseModel):
    java_code: str
    t: float
    nc: int
    nm: int
    uc: float
    Pc: float
    Pm: float
    PUE: float

@router.post("/carbon-emission/")
def get_carbon_emission(code_input: CodeInput):
    if not code_input.java_code:
        raise HTTPException(status_code=400, detail="Java code cannot be empty")
    emission = calculate_carbon_emission(code_input.t, code_input.nc, code_input.nm, code_input.uc, code_input.Pc, code_input.Pm, code_input.PUE)
    return {"carbon_emission": emission}
