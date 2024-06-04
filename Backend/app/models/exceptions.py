from ..models.response import ExceptionResponse, Response

def handle_DataNotFoundException(id: int):
    return ExceptionResponse(
            exception="DataNotFoundException",
            message="요청한 데이터를 데이터베이스에서 찾을 수 없습니다(id: %d)" % id)

