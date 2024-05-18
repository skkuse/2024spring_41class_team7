from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Carbon Emission Calculator"
    ADMIN_PASSWORD: str = "your_admin_password"  # 실제로는 환경 변수로 설정

    class Config:
        case_sensitive = True

settings = Settings()
