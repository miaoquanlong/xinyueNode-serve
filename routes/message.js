var express = require('express');
var router = express.Router();
var pool = require("../common/sqlconfig");
let mysql = require('mysql')
let guid = require('../common/guid')



// 检索留言
router.post('/searchmessage',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM message '
    let sqlorder = ' ORDER BY messageid '
    if (reqs.channel) {
        sqlStatement = sqlStatement +'WHERE channel = ' + `'${reqs.channel}'` + sqlorder
    }
    if (reqs.userid) {
        sqlStatement = sqlStatement +'WHERE userid = ' + `'${reqs.userid}'` + sqlorder
    }
    if (reqs.keywords) {
        sqlStatement = sqlStatement +'WHERE content like '+`'%${reqs.keywords}%'` + ' OR id like ' +`'%${reqs.keywords}%'`+ sqlorder
    }
  let query =  pool.query(sqlStatement,(err,result) => {
      console.log(query.sql,"562");
        if (err) {
            return res.json({
                code:-1,
                data:'查询失败'
            })
        }
        return res.json({
            code: 0,
            data: {
                result: result,
                count: result.length
            },

        })
    })
})



// 删除留言
router.post('/deletemessage',(req,res,next) => {
    let reqs = req.body
  let query=  pool.query('DELETE  FROM message WHERE  id in '  + (`(${reqs.id})`),(err,result) => {
      console.log(query.sql,"删除");
        if (err) {
            return res.json({
                code: -1,
                data: '删除失败'
            })
        }
        return res.json({
            code: 0,
            data: '删除成功'
        })
        pool.end()
    })
})



// 编辑留言
router.post('/editspace', (req, res, next) => {
    let reqs = req.body
    let post = { 
        image: reqs.image, 
        channel: reqs.channell, 
        linkType: reqs.linkType,
        position:reqs.position,
        id:reqs.postId,
        spacename:reqs.spacename,
        createTime: new Date(),
        status:reqs.status,
    }
    console.log(post,"622");
    
    let query = pool.query(" UPDATE message SET image = ? ,channel = ? ,  linkType = ? ,position= ? ,spacename = ?, status = ?  WHERE id = ?", 
    [ reqs.image, reqs.channell, reqs.linkType, reqs.position, reqs.spacename, reqs.status,reqs.postId], (err, result) => {
        console.log(query.sql);
        if (err) {
            return res.json({
                code: -1,
                data: '修改失败'
            })
        }
        return res.json({
            code: 0,
            data: '修改成功'
        })
        pool.end()
    })
})

// 检索单条留言
router.post('/gethspace',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM message  WHERE id = '+ `'${reqs.id}'`
 let query =   pool.query(sqlStatement,(err,result) => {
     console.log(query.sql,"搜索id");
        if (err) {
            return res.json({
                code:-1,
                data:'查询失败'
            })
        }
        return res.json({
            code: 0,
            data: {
                result: result,
                count: result.length
            },

        })
    })
})



module.exports = router;
