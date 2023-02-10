const translate = require('@iamtraction/google-translate');
const express = require('express');
const {languages}=translate;
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/:langCode/:text', async (req, res)=>{
    translate(req.params.text, {to: req.params.langCode})
    .then(({text})=>{
        res.send({text: text});
    })
    .catch((err)=>{
        res.status(404).send({error: true,message: err.message});
    })
    .catch((err)=>{
        console.log(err.message);
    });
});

app.get('/languages', (req, res)=>{
    res.status(200).send(JSON.stringify(languages))
});

const port=process.argv[2] || 3000;
app.listen(port, ()=>console.log('listening on port ' + port));
