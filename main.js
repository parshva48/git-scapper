let cheerio=require("cheerio");
let request=require("request");
let obj=require("./repo");
let url="https://github.com/topics";
request(url,cb);
//f3.lh-condensed.text-center.Link--primary.mb-0.mt-1
function cb(error,header,html)
{
    let cheerioselector=cheerio.load(html);
    let topics=cheerioselector(".topic-box.position-relative.hover-grow.height-full.text-center.border.color-border-muted.rounded.color-bg-default.p-5 a");
   for(let i=0;i<topics.length;i++)
   {
       let link=cheerioselector(topics[i]).attr("href");
      let fulllink="https://github.com"+link;
      obj.repo(fulllink);
      
   }
    
}