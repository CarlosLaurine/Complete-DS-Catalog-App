### Docker Powershell Command to Connect the Application to the Heroku's PostgreSQL DB
* docker run -p 80:8080 --name dscatalog-heroku-container -e APP_PROFILE=dev -e DB_PASSWORD=cbdbe13b6f2f96a3afab4193f410d4dda6921b80a599440e61ddb36a4606006e -e DB_URL=jdbc:postgresql://ec2-35-170-85-206.compute-1.amazonaws.com:5432/df7c4ss432mbi3 -e DB_USERNAME=nujxgtvmgtiqpx -e POSTGRES_DB=df7c4ss432mbi3 dscatalog:vf

### Docker Powershell Command to Connect the Application to the Amazon RDS PostgreSQL DB
* docker run -p 80:8080 --name dscatalog-aws -e APP_PROFILE=dev -e DB_PASSWORD=12345678 -e DB_URL=jdbc:postgresql://implantation-class.ckhhi5kl63gx.us-east-2.rds.amazonaws.com:5432/dscatalog -e DB_USERNAME=postgres -e POSTGRES_DB=dscatalog carlospinho/dscatalog:vf