import {readFileSync,readdirSync,existsSync} from 'node:fs';
import {join} from 'node:path';
const dir='dist';
const pages=readdirSync(dir).filter(file=>file.endsWith('.html'));
const errors=[];
const whatsappMessages=new Set();
for(const page of pages){
  const html=readFileSync(join(dir,page),'utf8');
  for(const [,attr,target] of html.matchAll(/\b(href|src)="([^"]+)"/g)){
    if(!target.startsWith('/'))continue;
    const [path,hash]=target.split('#');
    const file=path==='/'?'index.html':path.slice(1);
    if(!existsSync(join(dir,file)))errors.push(`${page}: missing ${attr} ${target}`);
    if(hash&&file===page&&!html.includes(`id="${hash}"`))errors.push(`${page}: missing anchor #${hash}`);
  }
  if(!html.includes('<main id="main">'))errors.push(`${page}: missing main`);
  if(!html.includes('<h1>'))errors.push(`${page}: missing h1`);
  if(html.includes('<form'))errors.push(`${page}: unexpected form`);
  for(const [,number,message] of html.matchAll(/href="https:\/\/wa\.me\/([^?"]+)\?text=([^"]+)"/g)){
    if(number!=='5519991811853')errors.push(`${page}: wrong WhatsApp number`);
    whatsappMessages.add(message);
  }
  if(page!=='404.html'&&!html.includes('https://wa.me/5519991811853?text='))errors.push(`${page}: missing WhatsApp contact`);
}
const home=readFileSync(join(dir,'index.html'),'utf8');
const sections=(home.match(/<section\b/g)||[]).length;
if(sections<10)errors.push(`Home has only ${sections} sections`);
if(whatsappMessages.size<12)errors.push(`Only ${whatsappMessages.size} distinct WhatsApp messages`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}
else console.log(`Validated ${pages.length} pages, ${sections} home sections and ${whatsappMessages.size} distinct WhatsApp messages; all local links and assets resolve.`);
