(()=>{"use strict";const{execCommand:s,logger:i}=require("../utils/helpers.js"),{ALIAS_DATA:a}=require("../utils/constants.js");module.exports=async()=>{const t=await s("git config --list","Checking aliases exist");t.stdout.includes(`alias.${a.ACT.key}=${a.ACT.command}\n`)&&t.stdout.includes(`alias.${a.THRUST.key}=${a.THRUST.command}\n`)&&(i.log("Aliases existed!"),process.exit()),await s(`git config --global alias.${a.ACT.key} "!${a.ACT.command}"`,"Creating git alias for acting (committing)"),await s(`git config --global alias.${a.THRUST.key} "!${a.THRUST.command}"`,"Creating git alias for thrust (pushing)"),i.log("Create aliases success!")}})();