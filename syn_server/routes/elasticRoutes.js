const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
    host: 'localhost:9200',
});


router.use((req,res,next)=>{
    elasticClient.index({
        index: 'logs',
        body: {
            url:req.url,
            method:req.method,
        }
    })
    .then(res=>{
        console.log('Logs indexed')
    })
    .catch(err=>{
        console.log(err)
    })
    next();
});

router.get('/scripts',(req,res)=>{
    let query = {
        index:'scripts'
    }
    if (req.query.script) query.q =`*${req.query.script}*`;
    elasticClient.search(query)
    .then(resp=>{
        return res.status(200).json({
            script:resp.hits.hits
        });
    })
    .catch(err=>{
        return res.status(500).json({
            msg:'Error',
            err
        })
    })
});

router.get('/scripts/:id',(req,res)=>{
    let query = {
        index:'scripts',
        id: req.params.id
    }
    elasticClient.get(query)
    .then(resp=>{
       if(!resp){
           return res.status(404).json({
               script:resp
           });
       }
       return res.status(200).json({
           script:resp
       });
    })
    .catch(err=>{
        return res.status(500).json({
            msg:'Error not found',
            err
        })
    })
});

router.post('/scripts',(req,res)=>{
    elasticClient.index({
        index:'scripts',
        body: req.body
    })
    .then(resp=>{
        return res.status(200).json({
            msg:'scripts indexed'
        })
    })
    .catch(err=>{
        return res.status(500).json({
            msg:'Error',
            err
        })
    })
});

router.put('/scripts/:id',(req,res)=>{
    elasticClient.update({
        index:'scripts',
        id:req.params.id,
        body:{
            doc:req.body
        }
    })
    .then(resp=>{
        return res.status(200).json({
            msg:'script updated'
        });
    })
    .catch(err=>{
        return res.status(500).json({
            msg:'Error',
            err
        })
    })
});

router.delete('/scripts/:id',(req,res)=>{
    elasticClient.delete({
        index:'scripts',
        id:req.params.id,
    })
    .then(resp=>{
        return res.status(200).json({
            msg:'script deleted'
        });
    })
    .catch(err=>{
        return res.status(500).json({
            msg:'Error',
            err
        })
    })
});

module.exports = router;