let cheerio=require("cheerio");
let request=require("request");
let fs=require("fs");
let path=require("path");
let obj=require("./issues");
function wrapper(url)
{
    
    request(url,cb);

}


//f3.lh-condensed.text-center.Link--primary.mb-0.mt-1
function cb(error,header,html)
{
    let cheerioselector=cheerio.load(html);
    let allrepo=cheerioselector(".f3.color-fg-muted.text-normal.lh-condensed");
     let location="F:\\Webdev\\WebScrapping\\GitScrapper";
     let name=cheerioselector(".h1");
     name=cheerioselector(name).text();
     name=name.trim();
     let cpath=path.join(location,name);
     fs.mkdirSync(cpath);
     //console.log(name);
    for(let i=0;i<8;i++)
    {
        let anchor=cheerioselector(allrepo[i]).find("a");
        let link=cheerioselector(anchor[1]).attr("href");
        let fulllink="https://github.com"+link;
        
      let reponame=fulllink.split("/").pop();
        let filelocation=path.join(cpath,reponame+".json");
        let issuelink=fulllink+"/issues";
        fs.openSync(filelocation,"w");
         //console.log(fulllink);
        obj.issues(issuelink,filelocation);
        //https://github.com/ethereum/go-ethereum/issues
    }   
}

module.exports={
    repo:wrapper
}