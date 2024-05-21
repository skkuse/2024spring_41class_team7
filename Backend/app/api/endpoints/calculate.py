from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.carbon_calculator import calculate_carbon_emission

router = APIRouter()

class CodeInput(BaseModel):
    java_code: str
    cpu: str
    cores: int
    memory: int
    visibility: str

@router.post("/carbon-emission/")
def get_carbon_emission(code_input: CodeInput):
    if not code_input.java_code:
        raise HTTPException(status_code=400, detail="Java code cannot be empty")
    
    if code_input.cpu == "Low":
        t = 1
        uc = 0.3
        Pc = 50
        Pm = 5
        PUE = 1.1
    elif code_input.cpu == "Mid":
        t = 1
        uc = 0.6
        Pc = 100
        Pm = 10
        PUE = 1.2
    elif code_input.cpu == "High":
        t = 1
        uc = 0.9
        Pc = 150
        Pm = 15
        PUE = 1.3
    else:
        raise HTTPException(status_code=400, detail="Invalid CPU usage setting")

    emission = calculate_carbon_emission(t, code_input.cores, code_input.memory, uc, Pc, Pm, PUE)
    return {"carbon_emission": emission}
