from fastapi import APIRouter
from ...models.requests import ReportRequest

router = APIRouter()

@router.get("/reports/")
def create_report(new_report: ReportRequest):
    return None

@router.get("/reports/")
def get_reports():
    return None

@router.get("/reports/{report_id]")
def get_one_report(report_id: int):
    return None

@router.delete("/reports/{report_id}")
def delete_report(report_id: int):
    return None

@router.delete("/reports/fixedCode/{fixed_code_id")
def delete_report_by_fixed_code(fixed_code_id: int):
    return None
