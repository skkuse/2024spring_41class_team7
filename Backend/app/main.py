from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from app.api.endpoints import calculate, admin
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API for calculating carbon emissions based on Java code and other parameters.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://13.125.241.39:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(calculate.router, prefix="/calculate", tags=["calculate"])
app.include_router(admin.router, prefix="/admin", tags=["admin"])

templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
