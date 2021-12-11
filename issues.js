let cheerio=require("cheerio");
let request=require("request");
let fs=require("fs");
let path=require("path");
const repo = require("./repo");
let fpath;
let count=1;
function wrapper(url,filepath)
{
  
   request(url,cb);
   function cb(error,header,html)
{
    let arr=[];
    let cheerioselector=cheerio.load(html);
    let issues=cheerioselector(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
  
    for(let i=0;i<issues.length;i++)
    {
        let link=cheerioselector(issues[i]).attr("href");
        let fulllink="https://github.com"+link;
        let issuename=cheerioselector(issues[i]).text();
          arr.push({
            link:fulllink,
            name:issuename
        });

    }
    //console.log(filepath);
     let content=JSON.stringify(arr);
    
     fs.appendFileSync(filepath,content, 'utf8');
    
     
    }

}
//let url="https://github.com/topics/donnemartin/data-science-ipython-notebooks/issues";
//let url="https://github.com/sindresorhus/awesome/issues";
//request(url,cb);


module.exports={
    issues:wrapper
}
