"use strict"
const fs = require('fs');
const mime = require('mime-types');
const systempath = require('path');

const arrObj = require('../utils/array-object');

const SQLiteDAO = require('../db/sqlite3/sqlite-dao');
const dbFile = './db/news-database.db';
const db = new SQLiteDAO(dbFile);

class ResourceHandler {

    /**
     * Lấy file theo đường dẫn
     * @param {*} req 
     * @param {*} res 
     */
    getMediaFile(req, res) {
        let path = req.pathName
        let params = path.substring('/news/db/get-file/'.length);
        let fileRead = params.replace('/', systempath.sep);
        let contentType;
        //console.log(fileRead)

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

    /**
     * Lấy các tin private, tức là các tin có share_status != 1
     * @param {*} req 
     * @param {*} res 
     */
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
                                from news_share\
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

    /**
     * Lấy các tin public, tức là các tin có share_status = 1
     * @param {*} req 
     * @param {*} res 
     */
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
                                from news_share\
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

    /**
     * Nhận các tin client post lên, xử lý để lưu vào db
     * @param {*} req 
     * @param {*} res 
     */
    postNewsFiles(req, res) {
        //console.log(req.form_data)
        let user = req.form_data.params.user;
        let groupId = user + '-' + Date.now();
        new Promise(async (resolve, reject) => {
            let jsonObj = {
                group_id: groupId
                , content: req.form_data.params.content
                , news_type: req.form_data.params.count_image ? 1 : 2
                , share_status: req.form_data.params.share_status
                , title: req.form_data.params.title
                , user: user
                , time: Date.now()
            }
            try {
                let resultInsert = await db.insert(arrObj.convertSqlFromJson("news", jsonObj));
                for (let key in req.form_data.files) {
                    let jsonObj2 = {
                        group_id: groupId
                        , url: req.form_data.files[key].url
                    }
                    resultInsert = await db.insert(arrObj.convertSqlFromJson("news_files", jsonObj2));
                }
                if(req.form_data.params.image){
                    let jsonObj2 = {
                        group_id: groupId
                        , url: req.form_data.params.image
                    }
                    resultInsert = await db.insert(arrObj.convertSqlFromJson("news_share", jsonObj2));
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