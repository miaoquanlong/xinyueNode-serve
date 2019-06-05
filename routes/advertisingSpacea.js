var express = require('express');
var router = express.Router();
var pool = require("../common/sqlconfig");
let mysql = require('mysql')
let guid = require('../common/guid')



// 检索广告
router.post('/searchspace',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM advertisingSpacea '
    let sqlorder = ' ORDER BY positionsort '
    if (reqs.channelName) {
        sqlStatement = sqlStatement +'WHERE channelName = ' + `'${reqs.channelName}'` + sqlorder
    }
    if (reqs.status) {
        sqlStatement = sqlStatement +'WHERE status = ' + `'${reqs.status}'` + sqlorder
    }
    if (reqs.keywords) {
        sqlStatement = sqlStatement +'WHERE spacename like '+`'%${reqs.keywords}%'` + ' OR id like ' +`'%${reqs.keywords}%'`+ sqlorder
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

//新增广告
router.post('/putspace',(req,res,next) => {
    let reqs = req.body
    let post = { 
        image: reqs.image, 
        channelName: reqs.channel, 
        linkType: reqs.linkType,
        position:reqs.position,
        id:guid.newGUID(),
        spacename:reqs.spacename,
        createTime: new Date(),
        status:reqs.status
    }
  let query =  pool.query('INSERT INTO advertisingSpacea SET ?',post,(err,result) => {
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

// 删除广告
router.post('/deletespace',(req,res,next) => {
    let reqs = req.body
  let query=  pool.query('DELETE  FROM advertisingSpacea WHERE  id in '  + (`(${reqs.id})`),(err,result) => {
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



// 编辑i广告
router.post('/editspace', (req, res, next) => {
    let reqs = req.body
    let post = { 
        image: reqs.image, 
        channelName: reqs.channel, 
        linkType: reqs.linkType,
        position:reqs.position,
        id:reqs.postId,
        spacename:reqs.spacename,
        createTime: new Date(),
        status:reqs.status,
    }
    console.log(post,"622");
    
    let query = pool.query(" UPDATE advertisingSpacea SET image = ? ,channelName = ? ,  linkType = ? ,position= ? ,spacename = ?, status = ?  WHERE id = ?", 
    [ reqs.image, reqs.channel, reqs.linkType, reqs.position, reqs.spacename, reqs.status,reqs.postId], (err, result) => {
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

// 检索单条广告
router.post('/gethspace',(req,res,next) => {
    let reqs = req.body
    let sqlStatement = 'SELECT * FROM advertisingSpacea  WHERE id = '+ `'${reqs.id}'`
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

// 启用停用广告
router.post('/puststatus',(req,res,next) => {
    let reqs = req.body
    let query = pool.query(" UPDATE advertisingSpacea SET  status = ?  WHERE id = ?",[reqs.status,reqs.id],(err,result) => {
        console.log(query.sql,"23654");
        
        if (err) {
            return res.json({
                code: -1,
                data: '操作失败'
            })
        }
        return res.json({
            code: 0,
            data: '操作成功'
        })
        pool.end()
    } )
})


module.exports = router;
