FROM python:3.9-slim

RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get clean;

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
