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
    #allow_origins=["http://54.180.155.187:3000"],  # 배포 서버 주소
    allow_origins=["http://localhost:3000"],  # 로컬 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# deploy
#app.include_router(calculate.router, prefix="/calculate", tags=["calculate"])
#app.include_router(admin.router, prefix="/admin", tags=["admin"])

app.include_router(calculate.router, prefix="/api/calculate", tags=["calculate"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
#app.include_router(execute.router, prefix="/api/execute", tags=["execute_java"])

templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
