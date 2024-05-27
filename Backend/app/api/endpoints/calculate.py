from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.carbon_calculator import calculate_carbon_emission
from app.services.execute import execute_java_code

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
    
    if len(code_input.java_code.encode('utf-8')) > 5 * 1024:
        raise HTTPException(status_code=400, detail="Java code exceeds 5KB size limit")
    
    try:
        _, execution_time = execute_java_code(code_input.java_code)
    except HTTPException as e:
        raise HTTPException(status_code=400, detail=e.detail)
    
    if code_input.cpu == "Low":
        uc = 0.3
        Pc = 50
        Pm = 5
        PUE = 1.1
    elif code_input.cpu == "Mid":
        uc = 0.6
        Pc = 100
        Pm = 10
        PUE = 1.2
    elif code_input.cpu == "High":
        uc = 0.9
        Pc = 150
        Pm = 15
        PUE = 1.3
    else:
        raise HTTPException(status_code=400, detail="Invalid CPU usage setting")

    emission = calculate_carbon_emission(execution_time, code_input.cores, code_input.memory, uc, Pc, Pm, PUE)
    return {"carbon_emission": emission}
