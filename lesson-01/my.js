const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 1308;

const now = () =>new Date().toISOString().replace('T','').slice(0,19);

function render(template, data){
    const params = template.match(/({{[^}]*}})/g).map(param => param.replace(/[{}]/g,''));
    // console.log(params);
    // let html = template;
    params.forEach(element => {
        template = template.replace(`{{${element}}}`,  find(data, element));
    });
    // console.log(html);
    return template;

}

function find(data, name){
    if(name.indexOf('.') == -1){
        return data[name] || '';
    }else{
        const x = name.split('.');
        let temp = data;
        for( const y of x){
            temp = temp[y];
            if(!temp){
                return '';
            }
            // console.log(temp)
        }
        return temp;
    }
}

const data = {
    name: 'cwz',
    age: 23,
    content:{
        action: 'love',
        target: 'yp',
    },
}

console.log(data[0])
const server = http.createServer((req,res) => {
    console.log(`${now()} request ${req.url}`);
    const html = fs.readFileSync('./index.template').toString()
    // console.log(html)
    const rendered = render(html,data)
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end(rendered)
}).listen(port,hostname,() => {
    console.log("sss");
})