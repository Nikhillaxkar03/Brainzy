"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(num) {
    const str = "1234567890asxcvbnjhgtyuioplkmnhgfdewsssxccxzsertyhbnmbvfyjn";
    let ans = "";
    for (let i = 0; i <= num; i++) {
        ans = ans + str[Math.floor(Math.random() * str.length)];
    }
    return ans;
}
