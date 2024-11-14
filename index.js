import{i as n,S as d}from"./assets/vendor-B2mb6eXk.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();function u(o){return fetch(`https://pixabay.com/api/?key=46052576-a4ef4f0d52180e04b4399e04b&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=30`).then(r=>(r.ok||n.error({message:"Something went wrong",position:"bottomRight"}),r.json()))}function m(o){return o.map(({largeImageURL:s,webformatURL:a,tags:r,likes:e,views:t,comments:c,downloads:l})=>`<li class="gallery-item">
        <article class="card">
    <a class="card-link" href="${s}"><img class="card-image" src="${a}" alt="${r}" loading="lazy"/></a>        <div class="card-container">
          <div class="card-item">
            <p class="card-title">Likes</p>
            <p class="card-count">${e}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Views</p>
            <p class="card-count">${t}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Comments</p>
            <p class="card-count">${c}</p>
          </div>
          <div class="card-item">
            <p class="card-title">Downloads</p>
            <p class="card-count">${l}</p>
          </div>
        </div>
        </article>
          </li>`).join("")}const i={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader")},p=new d(".gallery a",{captionDelay:300,captionsData:"alt"});i.form.addEventListener("submit",f);function f(o){o.preventDefault();const a=o.currentTarget.elements.state.value.trim();if(i.gallery.innerHTML="",!a){n.error({message:"Please enter your request",position:"bottomRight"});return}i.loader.style.display="inline-block",u(a).then(r=>{if(r.hits.length===0){n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),i.loader.style.display="none";return}const e=m(r.hits);i.gallery.insertAdjacentHTML("beforeend",e),p.refresh(),i.loader.style.display="none"}).catch(r=>{console.log(r.message)})}
//# sourceMappingURL=index.js.map
