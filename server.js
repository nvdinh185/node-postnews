const express = require('express');
const app = express();
const os = require('os');

function main(isHttp) {

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
      console.log("Server HTTP (" + os.platform() + "; " + os.arch() + ") is started with PORT: "
        + portHttp
        + "\n tempdir: " + os.tmpdir()
        + "\n " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      );
    });
  }
}

const isHttp = 8080;

main(isHttp);