from fastapi import APIRouter
from ...models.requests import ReportRequest
from ...services.report_service import ReportService
from ...models.response import ReportResponse, ListBody, Response
from ...models.exceptions import *
from ...domain.domains import Report

router = APIRouter()
SUCCESS = "success"
FAIL= "fail"

@router.post("/")
def create_report(new_report_req: ReportRequest):
    new_report = ReportService.create(Report.create(new_report_req))
    return Response(
        status=SUCCESS,
        onSuccess=ReportResponse.create(new_report),
        onError=None)

@router.get("/")
def get_reports():
    find_reports = ReportService.find_all()
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_reports),
            items=map(lambda report: ReportResponse.create(report), find_reports)),
        onError=None
    )

@router.get("/{report_id}")
def get_one_report(report_id: int):
    try:
        find_report = ReportService.find_one(report_id)
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
def get_reports_by_fixed_code(fixed_code_id: int):
    find_reports = ReportService.find_all_by_fixed_code(fixed_code_id)
    return Response(
        status=SUCCESS,
        onSuccess=ListBody(
            nItems=len(find_reports),
            items=map(lambda report: ReportResponse.create(report), find_reports)
        ), onError=None
    )

@router.delete("/{report_id}")
def delete_report(report_id: int):
    ReportService.delete_one(report_id)
    return Response(status=SUCCESS, onSuccess=None, onError=None)

@router.delete("/fixedCode/{fixed_code_id}")
def delete_report_by_fixed_code(fixed_code_id: int):
    ReportService.delete_all_by_fixed_code(fixed_code_id)
    return Response(status=SUCCESS, onSuccess=None, onError=None)
