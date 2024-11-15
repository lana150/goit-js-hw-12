import{a as h,S as y,i as c}from"./assets/vendor-DtKhzRW5.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();let m=15;async function f(i,a=1){const o="https://pixabay.com/api/?key=",s="46052576-a4ef4f0d52180e04b4399e04b",e=new URLSearchParams({q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:m,page:a}),r=await h.get(`${o}${s}&${e}`),{data:{hits:l,totalHits:d}}=r;return{hits:l,totalHits:d}}function p(i){return i.map(({largeImageURL:a,webformatURL:o,tags:s,likes:e,views:r,comments:l,downloads:d})=>`<li class="gallery-item">
        <article class="card">
    <a class="card-link" href="${a}"><img class="card-image" src="${o}" alt="${s}" loading="lazy"/></a>        <div class="card-container">
          <div class="card-item">
            <p class="card-title">Likes</p>
            <p class="card-count">${e}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Views</p>
            <p class="card-count">${r}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Comments</p>
            <p class="card-count">${l}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Downloads</p>
            <p class="card-count">${d}</p>
          </div>
        </div>
        </article>
          </li>`).join("")}const g=new y(".gallery a",{captionDelay:300,captionsData:"alt"}),t={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),button:document.querySelector(".gallery-button")};t.form.addEventListener("submit",b);t.button.addEventListener("click",v);let u="",n=1;async function b(i){i.preventDefault();const o=i.currentTarget.elements.state.value.trim();if(u=o,n=1,t.gallery.innerHTML="",t.button.classList.remove("is-visible"),!o){c.error({message:"Please enter your request",position:"bottomRight"}),t.button.classList.remove("is-visible");return}t.loader.classList.add("is-visible");try{const{hits:s}=await f(u,n);if(s.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"});return}s.length<m?t.button.classList.remove("is-visible"):t.button.classList.add("is-visible");const e=p(s);t.gallery.insertAdjacentHTML("beforeend",e),g.refresh()}catch{c.error({message:"Please try again later",position:"bottomRight"})}finally{t.loader.classList.remove("is-visible"),t.form.reset()}}async function v(){n+=1;try{t.loader.classList.add("is-visible"),t.button.classList.remove("is-visible");const{hits:i,totalHits:a}=await f(u,n),o=p(i);if(t.gallery.insertAdjacentHTML("beforeend",o),g.refresh(),L(),n>Math.ceil(a/m)-1){t.button.classList.remove("is-visible"),c.error({message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"});return}t.button.classList.add("is-visible")}catch{c.error({message:"Please try again later",position:"bottomRight"})}finally{t.loader.classList.remove("is-visible")}}function L(){const s=t.gallery.querySelector("li").getBoundingClientRect().height*2+140;window.scrollBy({top:s,left:0,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
