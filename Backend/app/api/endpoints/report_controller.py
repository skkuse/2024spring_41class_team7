from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ...models.requests import ReportRequest
from ...services.report_service import ReportService
from ...models.response import ReportResponse, ListBody, Response
from ...models.exceptions import *
from ...domain.domains import Report
from ... import database

router = APIRouter()
SUCCESS = "success"
FAIL= "fail"

@router.post("/")
def create_report(new_report_req: ReportRequest, db: Session = Depends(database.get_db)):
    reportService = ReportService(db)
    new_report = reportService.create(Report.create(new_report_req))
    return Response(
        status=SUCCESS,
        onSuccess=ReportResponse.create(new_report),
        onError=None)

@router.get("/")
def get_reports(db: Session = Depends(database.get_db)):
    reportService = ReportService(db)
    find_reports = reportService.find_all()
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_reports),
            items=map(lambda report: ReportResponse.create(report), find_reports)),
        onError=None
    )

@router.get("/{report_id}")
def get_one_report(report_id: int, db: Session = Depends(database.get_db)):
    try:
        reportService = ReportService(db)
        find_report = reportService.find_one(report_id)
        if find_report is None: raise FileNotFoundError
        return Response(
            status=SUCCESS,
            onSuccess=ReportResponse.create(find_report),
            onError=None)
    except FileNotFoundError:
        exception_body = handle_DataNotFoundException(report_id)
        return Response(
            status=FAIL,
            onSuccess=None,
            onError=exception_body)


# [new] get all reports by fixed codes
@router.get("/fixedCode/{fixed_code_id}")
def get_reports_by_fixed_code(fixed_code_id: int, db: Session = Depends(database.get_db)):
    reportService = ReportService(db)
    find_reports = reportService.find_all_by_fixed_code(fixed_code_id)
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_reports),
            items=map(lambda report: ReportResponse.create(report), find_reports)
        ), onError=None
    )

@router.delete("/{report_id}")
def delete_report(report_id: int, db: Session = Depends(database.get_db)):
    try:
        reportService = ReportService(db)
        result = reportService.delete_one(report_id)
        if not result: raise FileNotFoundError
        return Response(status=SUCCESS, onSuccess=None, onError=None)
    except FileNotFoundError:
        exception_body = handle_DataNotFoundException(report_id)
        return Response(
            status=FAIL,
            onSuccess=None,
            onError=exception_body)

@router.delete("/fixedCode/{fixed_code_id}")
def delete_report_by_fixed_code(fixed_code_id: int, db: Session = Depends(database.get_db)):
    reportService = ReportService(db)
    reportService.delete_all_by_fixed_code(fixed_code_id)
    return Response(status=SUCCESS, onSuccess=None, onError=None)
