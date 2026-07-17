const express=require('express');const path=require('path');const fs=require('fs');
const app=express();const distPath=path.join('/home/claude/qr27','dist');
app.use(express.static(distPath,{index:false,redirect:false}));
app.get('*all',(req,res)=>{
  const cleanPath=req.path.replace(/^\/+|\/+$/g,'');
  console.log('REQ path=',JSON.stringify(req.path),'clean=',JSON.stringify(cleanPath));
  if(cleanPath){const pr=path.join(distPath,cleanPath,'index.html');console.log('check',pr,fs.existsSync(pr));if(fs.existsSync(pr))return res.sendFile(pr);}
  res.sendFile(path.join(distPath,'index.html'));
});
app.listen(3001,()=>console.log('dbg on 3001'));
