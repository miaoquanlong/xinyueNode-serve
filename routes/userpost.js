var express = require('express');
var router = express.Router();
var pool = require("../common/sqlconfig");
let mysql = require('mysql')


// 检索纠结列表

router.post('/searchpostlist', (req, res, next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM userposts '
    if (reqs.postid) {
        sqlStatement = sqlStatement +'WHERE id = ' + reqs.postid
    }
    if (reqs.status) {
        sqlStatement = sqlStatement +'WHERE status = ' + reqs.status
    }
    if (reqs.keywords) {
        sqlStatement = sqlStatement + 'WHERE postcontent like ' +`'%${reqs.keywords}%'` + ' OR id like ' +`'%${reqs.keywords}%'`
    }
 pool.query(sqlStatement, (err, result, fields) => {
        if (err) {
            return res.json({
                code: -1,
                data: '查询失败'
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
// 上下架
router.post('/putframe',(req,res,next) =>{
 let reqs = req.body 
 pool.query('UPDATE userposts set status = ? WHERE id = ?', [reqs.status,reqs.id],(err,result) => {
     if (err) {
         return res.json({
             code:-1,
             data:'状态修改失败'
         })
     }
     return res.json({
         code:0,
         data:'修改成功'
     }) 
 })
})

// 删除广告
router.post('/deletepost',(req,res,next) => {
    let reqs = req.body
  let query=  pool.query('DELETE  FROM userposts WHERE  id in '  + (`(${reqs.id})`),(err,result) => {
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



module.exports = router;
