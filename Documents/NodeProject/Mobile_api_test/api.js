const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 1337;
const user = require('./user.json');
const SECRET = 'YzhWGT$S0$DGOgQ&@vUx&';
const RandExp = require('randexp');
const fs = require('fs');

function checkPermission(req,res,next){
    if(req.path !== '/login'){
        const token = req.headers['authorization'];
        if(!token) return res.status(401).send({message: 'token nao informado'});
        jwt.verify(token, SECRET,(err,decoded)=>{
            if(err) return res.status(500).send({message: 'Acesso Negado'});
            req.useId = decoded.id;
            next();
        });
    }else{
        next();
    }
}

app.use(express.json());
app.use(checkPermission);
app.listen(port,()=>{
    console.log('servidor iniciado');
});

app.post('/login',(req,res)=>{
if(req.body.username === 'eric' && req.body.password ==='test'){
   const id = '1';
   const token = jwt.sign({id},SECRET,{expiresIn:3000});
   console.log('Login chamado!');
   res.set('Authorization',token);
   console.log(user);
   res.send(user);
}else{
    res.status(403).send({ message: 'Acesso Megado'});
}
});

app.get('/',(req,res)=> res.send({ok: 'ok'}));

app.post('/chamada',(req,res)=>{
   try {
    const queryIdUsuario = req.query.id;
    const randexp = new RandExp(/[a-z]{3,9}/);
    const resposta =  randexp.gen().toString()+queryIdUsuario;
    console.log('Sala da chamada é ' + resposta);
    res.send({"room": resposta, "password": randexp.gen()});
   } catch (error) {
       console.log(error);
       res.status(500).send({message: 'Sala não gerada'})
   }
});

//Esse metodo recebe arquivos enviados pelo aplicativo, por ser o fornecedor do serviço os metodos que baixam e enviam acabam ficando trocados
app.get('/arquivos/enviar',(req,res)=>{
    const queryUserId = req.query.userId;
    const arquivosRecebidos = req.body;
    try {
        if(req.body!==null){
            const data = fs.writeFileSync(`C:/Users/Mobile02/Documents/NodeProject/Mobile_api_test/${queryUserId}_arquivos.txt`, JSON.stringify(arquivosRecebidos));
            //file written successfully
            console.log('Arquivos recebidos da aplicação!');
            res.status(400).send({message: 'Arquivos recebidos com sucesso!'});
        }else{
            const data = fs.writeFileSync(`C:/Users/Mobile02/Documents/NodeProject/Mobile_api_test/${queryUserId}_arquivos.txt`);
            res.status(400).send({message: 'Arquivos recebidos com sucesso! Nenhum arquivo constando no body'});
        }
        
      } catch (err) {
        console.error(err)
      }
  
});

//Esse metodo envia os arquivos que temos do usuario para o aplicativo, por ser o fornecedor do serviço os metodos que baixam e enviam acabam ficando trocados
app.post('/arquivos/baixar',(req,res)=>{
    const queryNome = req.query.userId;
    try {
        const data = fs.readFileSync(`C:/Users/Mobile02/Documents/NodeProject/Mobile_api_test/${queryNome}_arquivos.txt`,'utf8');
        //file written successfully
        console.log('Arquivos enviados para a aplicação!');
        res.status(401).send(data);
      } catch (err) {
        console.error(err)
      }
  
});