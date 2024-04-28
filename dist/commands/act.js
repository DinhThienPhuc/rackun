(()=>{"use strict";const{execCommand:e,execMultiCommands:t,logger:o,wait:n}=require("../utils/helpers.js");module.exports=async()=>{const i=performance.now(),s=process.argv[4],[a,c]=await t(["git diff --name-only","git ls-files --other --exclude-standard"],"Checking core components changes"),g=[...a.stdout.split("\n"),...c.stdout.split("\n")].filter((e=>e.includes("src/_core/")));g.length?(await e("bit tag -m 'Update'","Tagging all core components changes"),await n(2e3),o.log("Tagged: \n",g.join("\n"))):o.log("No core components found!"),await e("git add .","Adding files"),await e(`git commit -m "${s}"`,"Committing");const l=performance.now();o.log(`🦝 Done in ${((l-i)/1e3).toFixed(1)}s`)}})();