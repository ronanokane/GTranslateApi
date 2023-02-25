const translate = require('@iamtraction/google-translate');
const express = require('express');
const {languages}=translate;

const app = express();

app.get('/:langCode/:text', async (req, res)=>{
    translate(req.params.text, {to: req.params.langCode})
    .then(({text})=>{
        res.status(200).json({text: text});
    })
    .catch((err)=>{
        res.status(404).json({error: true,message: err.message});
    })
    .catch((err)=>{
        console.log(err.message);
    });
});

app.get('/languages', (req, res)=>{
    try{
        res.status(200).json(languages)
    }catch(err){
        console.log(err.message)
    }
});

const port=process.argv[2] || 3000;
app.listen(port, ()=>console.log('listening on port ' + port));
