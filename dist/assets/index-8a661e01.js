(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const a="/search.svg",f=r=>new Promise((e,t)=>{try{fetch(`https://dummyjson.com/products/search?q=${r}&limit=5`).then(s=>s.json()).then(s=>e(s.products))}catch(s){console.log("error - ",s),t(s)}}),p=800;let u;const g=["ArrowDown","ArrowUp"],c=[];let i=-1;const h=5,m=r=>{r.addEventListener("keyup",e=>{g.includes(e.key)?y(e.key):L(e)}),r.focus()};function y(r){if(r==="ArrowDown"){i++,i===c.length&&(i=0);for(let e=0;e<c.length;e++){const t=document.getElementById(`item-${e}`);i===e?t==null||t.classList.add("active"):t==null||t.classList.remove("active")}}}const v=r=>{clearTimeout(u),u=setTimeout(()=>{r()},p)},L=r=>{const e=r.target.value;i=-1,e?v(t):(clearTimeout(u),c.length=0,d());async function t(){const s=await f(e);s&&s.length>0?(c.length=0,c.push(...s),d()):c.length=0}},d=()=>{let r="",e=0;for(const s of c)if(r+=`
            <div class="suggestion-list-item" id="item-${e++}">
                <span>${s.title}</span>
            </div>
       `,e===h)break;const t=document.getElementById("suggestions");t.innerHTML=r,c.length===0?t.style.display="none":t.style.display="block"};document.querySelector("#app").innerHTML=`
  <div id="wrapper">
    <div id="input-group">
      <img src=${a} />
      <input type="text" class="search-input" name="search" id="search" autocomplete="off" placeholder="Search">
      <div class="suggestion-list" id="suggestions"></div>
    </div>
  </div>
`;m(document.querySelector("#search"));
