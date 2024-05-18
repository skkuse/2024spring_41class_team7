from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.templating import Jinja2Templates
from fastapi import Request
from app.core.config import settings

router = APIRouter()
security = HTTPBasic()
templates = Jinja2Templates(directory="app/templates")

def get_current_admin(credentials: HTTPBasicCredentials = Depends(security)):
    if credentials.password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Incorrect password")
    return credentials

@router.get("/")
def read_admin(request: Request, credentials: HTTPBasicCredentials = Depends(get_current_admin)):
    return templates.TemplateResponse("admin.html", {"request": request})
