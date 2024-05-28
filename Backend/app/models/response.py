from pydantic import BaseModel
from typing import Optional

class ExceptionResponse(BaseModel):
    exception: str
    message: str

class Response(BaseModel):
    status: str
    onSuccess: Optional[object] = None
    onError: Optional[ExceptionResponse] = None
