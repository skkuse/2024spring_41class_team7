FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY gradlew /app/
COPY gradle /app/gradle
COPY build.gradle /app/
COPY settings.gradle /app/
COPY src /app/src

RUN apk update && apk add --no-cache findutils

RUN chmod +x gradlew

RUN ./gradlew build

COPY build/libs/refactor-engine-1.0.1.jar /app/refactor-engine-1.0.1.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/refactor-engine-1.0.1.jar"]
