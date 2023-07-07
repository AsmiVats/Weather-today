const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
    
})

app.post("/",function(req,res){

    const query = req.body.cityname;
    const apikey = "a004fcfb2f69fb2316d1767404dd876a"
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
     https.get(url,function(response){


        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherdata =  JSON.parse(data);
            const temp = weatherdata.main.temp;
            const des = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
        
                
            const imgurl = "https://openweathermap.org/img/wn/" + icon+ "@2x.png";
                    res.render("weath",{temp: temp,des:des,imgurl:imgurl});
                })
            })

})

//

app.listen(3000,function(){
    console.log("Server is starting at port 3000");
})