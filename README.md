
# Web Pharmacy

## Project Demo
https://bucolic-begonia-e8168d.netlify.app/

login credentials:

email - test1@gmail.com

password - test123

## Local Setup

### Backend

```
cd server
npm install
npm test
```

### Frontend
```
cd client
npm install
npm run dev
```
### Database
#### Create local database
```
mysql -u [username] -p[password]
create database project
```
#### To create required tables
```
mysql -u [username] -p[password] -h [hostname] < [path to project.sql file provided in the repo]
```
### Environment Variables
#### Create .env file
```
JWT_SECRET=[jwt secret key]
JWT_LIFETIME=10d
HOST=[hostname]
USER=[username]
DB_PORT=[port]
PASSWORD=[password]
DATABASE=project
```
### API Endpoints
Import the JSON file pharma-dbms.postman_collection in postman



