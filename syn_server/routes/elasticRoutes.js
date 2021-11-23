const express = require('express');
const router = express.Router();
const elastic = require('elasticsearch');

const elasticClient = elastic.Client({
    host: 'localhost:9200',
});

let scripts = [
    {
        "id":1,
        "title":"Les Eternels",
        "catégorie":["action","aventure","fantaisie"],
        "logline":"La saga des Eternels, une race d'êtres immortels ayant vécu sur Terre et façonné son histoire et ses civilisations.",
        "pitch":"Après les événements d'\"Avengers : Endgame\", une tragédie imprévue oblige les Éternels à sortir de l'ombre et à se rassembler à nouveau face à l'ennemi le plus ancien de la race humaine : les Déviants"
    },
    {
        "id":2,
        "title":"Dune",
        "catégorie":["action","aventure","drame"],
        "logline":"Paul Atreides, un jeune homme brillant et doué au destin plus grand que lui-même, doit se rendre sur la planète la plus dangereuse de l'univers afin d'assurer l'avenir de sa famille et de son peuple.",
        "pitch":"Dans un futur lointain, la guerre fait rage entre familles de l'empire. Lorsque Leto Atréides est assassiné, son fils Paul s'allie aux mystérieux Fremen pour contrôler la production d'Epice et percer les secrets d'Arakis, la planète Dune."
    },
    {
        "id":3,
        "title":"The French Dispatch",
        "catégorie":["comédie","drame","romance"],
        "logline":"Une collection d'histoires publiées dans le \"French Dispatch Magazine\" prennent vie dans une France imaginaire au 20ème siècle..",
        "pitch":"Une revue hebdomadaire traitant du monde de la politique, des arts, de la mode, de la cuisine et d'histoires attirant l'intérêt général. Après le décès de l'éditeur en chef, l'équipe éditoriale décide de publier une dernière édition pour souligner les trois meilleures histoires de la dernière décennie."
    }
]


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