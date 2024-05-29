FROM python:3.9-slim

<<<<<<< HEAD
=======
RUN apt-get update && \
    apt-get install -y openjdk-11-jdk && \
    apt-get clean;

>>>>>>> b5f2d9130d8143d5d4b9ed685ec013a43780fb62
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY . /app

<<<<<<< HEAD
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
=======
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
>>>>>>> b5f2d9130d8143d5d4b9ed685ec013a43780fb62
