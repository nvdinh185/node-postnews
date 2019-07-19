"use strict"
const fs = require('fs');
const mime = require('mime-types');
const systempath = require('path');

const arrObj = require('../utils/array-object');

const SQLiteDAO = require('../db/sqlite3/sqlite-dao');
const dbFile = './db/news-database.db';
const db = new SQLiteDAO(dbFile);

class ResourceHandler {

    getMediaFile(req, res) {
        let path = req.pathName
        let params = path.substring('/news/db/get-file/'.length);
        let fileRead = params.replace('/', systempath.sep);
        let contentType;
        console.log(fileRead)

        if (mime.lookup(fileRead)) contentType = mime.lookup(fileRead);

        fs.readFile(fileRead, { flag: 'r' }, (error, data) => {
            if (!error) {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(JSON.stringify(error));
            }
        });
    }

    getPrivateNewsList(req, res) {
        db.getRsts("select * from news\
                    where share_status != 1\
                    order by time desc\
                    LIMIT "+ (req.paramS && req.paramS.limit ? req.paramS.limit : 10) + "\
                    OFFSET "+ (req.paramS && req.paramS.offset ? req.paramS.offset : 0) + "\
                    ")
            .then(async results => {
                //lay file chi tiet tra cho nhom
                if (results.length > 0) {
                    for (let idx = 0; idx < results.length; idx++) {
                        if (results[idx].news_type == 1) {
                            results[idx].medias = await db.getRsts("select *\
                                from news_files\
                                where group_id = '"+ results[idx].group_id + "'\
                                ")
                        } else if (results[idx].news_type == 2) {
                            results[idx].medias = await db.getRsts("select *\
                                from news_shares\
                                where group_id = '"+ results[idx].group_id + "'\
                                ")
                        }
                    }
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(results
                    , (key, value) => {
                        if (value === null) { return undefined; }
                        return value
                    }
                ));
            }).catch(err => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(JSON.stringify(err));
            })
    }

    getPublicNewsList(req, res) {
        //console.log(req.paramS)
        db.getRsts("select * from news\
                    where share_status = 1\
                    order by time desc\
                    LIMIT "+ (req.paramS && req.paramS.limit ? req.paramS.limit : 10) + "\
                    OFFSET "+ (req.paramS && req.paramS.offset ? req.paramS.offset : 0))
            .then(async results => {
                //lay file chi tiet tra cho nhom
                if (results.length > 0) {
                    for (let idx = 0; idx < results.length; idx++) {
                        if (results[idx].news_type == 1) {
                            results[idx].medias = await db.getRsts("select *\
                                from news_files\
                                where group_id = '"+ results[idx].group_id + "'\
                                ")
                        } else if (results[idx].news_type == 2) {
                            results[idx].medias = await db.getRsts("select *\
                                from news_shares\
                                where group_id = '"+ results[idx].group_id + "'\
                                ")
                        }
                    }
                }
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify(results
                    , (key, value) => {
                        if (value === null) { return undefined; }
                        return value
                    }
                ));
            }).catch(err => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(JSON.stringify(err));
            })
    }

    postNewsFiles(req, res) {
        let groupId = "766777123-1558323955188";//req.form_data.params.group_id ? req.form_data.params.group_id : req.user.username + '-' + new Date().getTime();
        new Promise(async (resolve, reject) => {
            let jsonObj = {
                group_id: groupId
                , content: req.form_data.params.content ? req.form_data.params.content : ""
                , news_type: req.form_data.params.image ? 2 : 1
                , share_status: req.form_data.params.share_status
                , title: req.form_data.params.title
                , user: ""//req.user.username
                , time: Date.now()
            }
            try {
                let resultInsert = await db.insert(arrObj.convertSqlFromJson("news", jsonObj, []));
                for (let key in req.form_data.files) {
                    let jsonObj2 = {
                        group_id: groupId
                        , url: req.form_data.files[key].url
                        , user: ""//req.user.username
                        , time: Date.now()
                    }
                    resultInsert = await db.insert(arrObj.convertSqlFromJson("news_files", jsonObj2, []));
                }
                resolve(resultInsert)
            } catch (e) {
                reject(e);
            }
        })
            .then(data => {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ message: data }));
            })
            .catch(err => {
                res.writeHead(438, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({
                    error: err,
                    message: "Lỗi ghi mới dữ liệu"
                }));
            })
    }
}

module.exports = {
    ResourceHandler: new ResourceHandler()
};