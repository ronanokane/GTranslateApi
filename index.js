const translate = require('@iamtraction/google-translate');
const express = require('express');
const app = express();

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

const port=process.argv[2] || 3000;
app.listen(port, ()=>console.log('listening on port ' + port));
