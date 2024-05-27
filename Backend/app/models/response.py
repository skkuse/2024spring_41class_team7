from pydantic import BaseModel
from typing import Optional

class ExceptionResponse(BaseModel):
    exception: Exception
    message: str

class Reponse(BaseModel):
    status: str
    onSuccess: Optional[object] = None
    onError: Optional[ExceptionResponse] = None
