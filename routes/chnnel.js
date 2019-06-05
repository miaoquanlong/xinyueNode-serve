var express = require('express');
var router = express.Router();
var pool = require("../common/sqlconfig");
let mysql = require('mysql')
let guid = require('../common/guid')

// 检索渠道
router.post('/searchnnel',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM chnnel '
    let sqlorder = ' ORDER BY chnnelNumbering '
    if (reqs.keywords) {
        sqlStatement = sqlStatement +'WHERE chnnelName like '+`'%${reqs.keywords}%'` + ' OR id like ' +`'%${reqs.keywords}%'`+ sqlorder
    }
  let query =  pool.query(sqlStatement,(err,result) => {
      console.log(query.sql,"233");
      
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
// 新增渠道
router.post('/addchnnel',(req,res,next) => {
    let reqs = req.body
    let post = { 
        chnnelName: reqs.chnnelname, 
        id:guid.newGUID(),
    }
    let query =  pool.query('INSERT INTO chnnel SET ?',post,(err,result) => {
        console.log(query.sql,"来了老弟")
          if (err) {
              return res.json({
                  code: -1,
                  data: '新增失败'
              })
          }
          return res.json({
              code: 0,
              data: '添加成功'
          })
          pool.end()
      })

})

// 编辑渠道
router.post('/editchnnel', (req, res, next) => {
    let reqs = req.body
    // let post = { 
    //     image: reqs.image, 
    //     channelName: reqs.channel, 
    //     linkType: reqs.linkType,
    //     position:reqs.position,
    //     id:reqs.postId,
    //     spacename:reqs.spacename,
    //     createTime: new Date(),
    //     status:reqs.status,
    // }
    // console.log(post,"622");
    
    let query = pool.query(" UPDATE chnnel SET chnnelName = ?   WHERE id = ?", 
    [ reqs.chnnelname ,reqs.postId], (err, result) => {
        console.log(query.sql,"???");
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

// 检索单条渠道
router.post('/getchnnel',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM chnnel  WHERE id = '+ `'${reqs.id}'`
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


// 删除渠道
router.post('/deletechnnel',(req,res,next) => {
    let reqs = req.body
  let query=  pool.query('DELETE  FROM chnnel WHERE  id  =  '  + (`'${reqs.id}'`),(err,result) => {
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
