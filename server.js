const express = require('express');
const app = express();

function main(isHttp) {

  //dòng này để cho phép truy cập đến server từ một địa chỉ khác
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
  });
  //CORS handle
  const cors = require('./handlers/cors-handler');
  app.use(cors.CorsHandler.cors);
  //csdl va luu tru file 
  const news = require('./routes/news-sqlite');
  app.use('/news/db', news);

  if (isHttp) {
    const httpServer = require('http').createServer(app);
    const portHttp = process.env.PORT || isHttp;
    httpServer.listen(portHttp, () => {
      console.log("Server is running in port " + portHttp)
    });
  }
}

const isHttp = 8080;

main(isHttp);