from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from .api.endpoints import calculate, admin, fixed_codes_controller, fix_strategy_controller, report_controller, buggy_codes_controller
from .core.config import settings
from sqlalchemy import create_engine, MetaData
from .domain import domains
from dotenv import load_dotenv
import os

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
app.include_router(fixed_codes_controller.router, prefix="/api/fixedCodes", tags=["fixed_codes"])
app.include_router(fix_strategy_controller.router, tags=["fix_strategy"])
app.include_router(buggy_codes_controller.router, tags=["buggy_codes"])
app.include_router(report_controller.router, tags=["reports"])
#app.include_router(execute.router, prefix="/api/execute", tags=["execute_java"])

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DB_URL = f'mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}'

engine = create_engine(DB_URL, pool_recycle=500)
domains.Base.metadata.create_all(engine)

templates = Jinja2Templates(directory="app/templates")

@app.get("/")
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})
