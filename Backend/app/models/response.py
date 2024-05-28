from pydantic import BaseModel
from typing import Optional

class ExceptionResponse(BaseModel):
    exception: str
    message: str

class Response(BaseModel):
    status: str
    onSuccess: Optional[object]
    onError: Optional[ExceptionResponse]

class ListBody(BaseModel):
    nItems: int
    items: list
