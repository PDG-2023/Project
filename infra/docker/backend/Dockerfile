FROM openjdk:19-jdk-alpine

ENV SWAGGER_UI false

ADD ./apps/backend/target/backend-1.jar /app.jar

ENTRYPOINT ["java","-jar","/app.jar"]
