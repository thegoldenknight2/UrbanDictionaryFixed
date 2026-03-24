(function(n,d,u){"use strict";const{sendBotMessage:o}=u.findByProps("sendBotMessage");let a;var c={onLoad(){a=d.registerCommand({name:"urban",displayName:"urban",description:"Look up a word on Urban Dictionary",displayDescription:"Look up a word on Urban Dictionary",type:1,inputType:1,options:[{name:"word",displayName:"word",description:"The word to look up",displayDescription:"The word to look up",type:3,required:!0}],execute:async function(s,t){const i=s.find(function(e){return e.name==="word"})?.value;if(i)try{const e=(await(await fetch(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(i)}`)).json())?.list?.[0];if(!e){o(t.channel.id,`\u274C No definition found for **${i}**.`);return}const p=e.definition.replace(/\[|\]/g,""),r=e.example?.replace(/\[|\]/g,"").trim();o(t.channel.id,`\u{1F4D6} **${e.word}**

${p}${r?`

*${r}*`:""}

\u{1F44D} ${e.thumbs_up}  \u{1F44E} ${e.thumbs_down}`)}catch{o(t.channel.id,"\u274C Failed to fetch definition. Try again!")}}})},onUnload(){a?.()}};return n.default=c,Object.defineProperty(n,"__esModule",{value:!0}),n})({},vendetta.commands,vendetta.metro);
