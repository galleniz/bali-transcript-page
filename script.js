let data = null;
const main = document.getElementsByTagName("main")[0];

fetch("https://cdn.discordapp.com/attachments/1070051727061028959/1071964493657157713/transcript.json")
  .then(response => response.text())
  .then(asd => {
    data = JSON.parse(asd);
    console.log(data);
readData( atob(data.guild))
let json;


try {
    json = JSON.parse(atob(data.messages));
    console.log("a")
} catch(e) {
    try {
    console.log("a :/")

         json = JSON.parse(data.messages);
    } catch (er)
    {
        console.log(e)
    }

}

console.log(JSON.stringify(json))
// console.log(atob('[{"content":"hola","author":"MrNiz","authorIconURL":"a","attachements":[],"timestamp":null,"bot":false},{}]'))
for (let data of json){
setMessage({content: data.content, author: data.author || defaultUserName, authorIconURL: data.authorIconURL, attachements: data.attachements || [], timestamp: data.timestamp || defaultDate, bot: data.bot})
}

  })
  .catch(error => {
    console.error(error);
  });

const params = Object.fromEntries(new URLSearchParams(window.location.search).entries());
let defaultDate = 1675642910818;
let defaultUserName = "Deleted User#0000";
let defaultBot = true;

function readData(dataStr)
{
    const req = JSON.parse(dataStr)
    
    const header = document.getElementById("header")
    header.getElementsByTagName("img")[0].src = req.guildIcon
    header.getElementsByTagName("h1")[0].innerText = req["guildName"] + " (" + req["guildId"] + ")"
    header.getElementsByTagName("h2")[0].innerText = req["channel"]
}
/**
 * exportSave
 */
// ''
// { "guildName": "Mizyico Community Discord", "guildId": "-1", "guildIcon": "https://images-ext-1.discordapp.net/external/-AV0NhM60fnxWHkccLXrqESsncXjzWCxXeKszWdvbHY/%3Fsize%3D2048/https/cdn.discordapp.com/icons/973021942892359711/daed5d7cdac059451354c820f3a557ec.webp", "channel": "🚗|carros-mamalones"}
// atob(params.guild)

function request(link){
    fetch("https://cors-anywhere.herokuapp.com/" + link)
    .then(response => response.text())
    .then(asd => {
        return asd;  
    })
    .catch(error => {
      console.error(error);
    });
console.log("hola");

return "Can't get data from \""+ link+ "\" :("
}
let curMsg = 0;

// {{content: String, author:String, timestamp:Number, authorIconURL:String, attachements:Array<{type:String, url:String}}
/**
 * 
 * @param {{content: String, author:String, timestamp:Number, authorIconURL:String, attachements:Array<{type:String, url:String}>}} data 
 */
function setMessage(data)
{
    if (!data.bot && data.bot !== false)
        data.bot = defaultBot;
    let date = new Date(data.timestamp);
    let div = document.createElement("div")
    let imgs = "<br></br>";
    for (const attachement of data.attachements)
    {
        console.log(attachement.type )
       if ( attachement.type !== "image")
       {
        
        imgs += `\n
        <atch class="attachement_txt" >
        <div class="attachement_text">
          <p>
          ${request(attachement.url)}
          </p>
        </div>
      </atch>
        `
       }
       else
       {
        imgs +=  `
        \n
        <img class="attachement_img" src="${attachement.url}"></img>
        `;
       }
    }
    console.log(data.bot)
    div.innerHTML = ` 
    <div id="${curMsg}-msg" class="simple_message">
    <img class="pfp" src='${data.authorIconURL}' onerror="this.src = 'img/discord.png'"></img>
    <author>${data.author}</author>
    ${data.bot ? `<img class="bot" src="https://cdn3.emoji.gg/emojis/1646-discord-bot-en.png"></img>` : ""}
    <timestamp>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} - ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</timestamp>
    <br></br>
    <msg>${data.content}</msg>
    <br></br>
    ${imgs !== "<br></br>" ? imgs : ""}
    <line> </line>
    
    </div>`
    main.appendChild(div);
}