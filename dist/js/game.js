"use strict";function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var MYAPP={};MYAPP.colors={red:"#C30101",green:"#36802D",blue:"#107DAC",yellow:"#E9D700",orange:"#FF4D00",purple:"#660066",mediumSpringGreen:"#00FA9A",sandyBrown:"#F4A460"},MYAPP.colorsNames=["red","green","blue","yellow","orange","purple","mediumSpringGreen","sandyBrown"],MYAPP.properly=[],MYAPP.answearColors=[],MYAPP.buttons={},MYAPP.bullets={},MYAPP.bullets.node=document.querySelector(".choice__colors"),MYAPP.chances={},MYAPP.chances.activeBullet={},MYAPP.chances.activeRow={},MYAPP.chances.indexOfRow=0,MYAPP.chances.node=[],MYAPP.dialogWindow=document.querySelector(".dialog-window"),function(){var a=document.querySelectorAll(".btn"),b=document.querySelectorAll(".chance__row");MYAPP.properly=document.querySelectorAll(".properly__bullet");for(var c=0;c<a.length;c++)MYAPP.buttons[a[c].id]=a[c];for(var d=b.length-1,e=0;0<=d;d--)MYAPP.chances.node[d]=b[e],e++}();var chooseColor=function(a){a.target.dataset.index&&(MYAPP.bullets.activeBullet=a.target)},changeColor=function(a){if(a.target.dataset.click){var b=a.target;MYAPP.bullets.activeBullet&&(b.style.backgroundColor=MYAPP.colors[MYAPP.bullets.activeBullet.dataset.color],b.dataset.color=MYAPP.bullets.activeBullet.dataset.color)}else return},randomColors=function(){for(var a=[],b=0;4>b;b++)a[b]=MYAPP.colorsNames[Math.floor(8*Math.random())];return a},finish=function(){window.location.reload()},checkWinOrLose=function(a){for(var b=0;b<MYAPP.properly.length;b++)MYAPP.properly[b].style.backgroundColor=MYAPP.colors[MYAPP.answearColors[b]];var c=MYAPP.dialogWindow.firstElementChild;c.parentElement.classList.remove("dialog-window--hidden"),"win"===a?c.firstElementChild.textContent="You "+a:"lose"==a&&(c.firstElementChild.textContent="You "+a),c.firstElementChild.nextElementSibling.addEventListener("click",finish)},updateHints=function(a,b){for(var c=0,d=0;d<b.length;d++)1===b[d]?(a.children[d].classList.add("chance__hint--hitted"),c+=1):2===b[d]&&a.children[d].classList.add("chance__hint--almost");4===c?checkWinOrLose("win"):4>c&&8===MYAPP.chances.indexOfRow&&checkWinOrLose("lose")},checkResult=function(a){for(var b,c=[].concat(_toConsumableArray(MYAPP.answearColors)),d=[],e=0;e<a.children.length;e++)b=a.children[e],d[e]=b.dataset.color||"";for(var f=[],g=0;g<d.length;g++)c[g]===d[g]?(f.push(1),c[g]="removed"):f.push(3);for(var h=0;h<d.length;h++)if(1!==f[h]&&2!==f[h])for(var k=0;k<d.length;k++)if(d[h]===c[k]){f[h]=2,c[k]="removed";break}f.sort(function(c,a){return c-a}),updateHints(a.nextElementSibling,f)},testAnswear=function(a){a.preventDefault();var b=MYAPP.chances.activeRow.firstElementChild;checkResult(b);var c=0;MYAPP.chances.activeRow.firstElementChild.removeEventListener("click",changeColor),9>c&&(c=++MYAPP.chances.indexOfRow),MYAPP.chances.activeRow=MYAPP.chances.node[c],MYAPP.chances.activeRow.firstElementChild.addEventListener("click",changeColor)},init=function(a){a.preventDefault(),this.disabled=!0;for(var b=randomColors(),c=0;c<b.length;c++)MYAPP.answearColors[c]=b[c];MYAPP.bullets.node.addEventListener("click",chooseColor),MYAPP.buttons.check.disabled=!1,MYAPP.buttons.check.classList.remove("btn__check--disabled"),MYAPP.chances.activeRow=MYAPP.chances.node[0],MYAPP.chances.activeRow.firstElementChild.addEventListener("click",changeColor),MYAPP.buttons.check.addEventListener("click",testAnswear)};MYAPP.buttons.start.addEventListener("click",init),MYAPP.buttons.finish.addEventListener("click",finish);