Steps to run the app:  
1 - Run : npm install  
2 - Create a postgres database with the following credentials:  
    username: 'postgres',  
    password: 'root',  
    database: 'pizzaria-utfpr',  
    host: 'localhost',  
3 - execute "npm start"  
4 - Comment the line 12 on index.js file(to stop the database sync)  
  
obs:   
    the jwt token has to be passed on the header as "authorization"  
    the file "RequestsSuficiencia.json" can be imported on "insomnia"(similar to postman) to load all the requests to be tested
  

  ![alt text](https://github.com/phelipeW/suficiencia-web2/blob/main/insomnia.png?raw=true)