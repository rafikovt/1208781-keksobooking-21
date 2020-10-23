(()=>{"use strict";(()=>{const e=document.querySelector("main"),t=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),r=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),o=r.querySelector(".error__button"),n=e=>{"Escape"===e.key&&(e.preventDefault(),a())},a=()=>{e.contains(t)?t.remove():r.remove(),document.removeEventListener("click",a),document.removeEventListener("keydown",n)};window.utils={openErrorOnLoad:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},openSuccessMessage:()=>{window.main.deactivatePage(),e.appendChild(t),document.addEventListener("click",a),document.addEventListener("keydown",n)},openErrorOnUpload:()=>{e.appendChild(r),o.addEventListener("click",a),document.addEventListener("click",a),document.addEventListener("keydown",n)},onPopupEscPress:n}})(),(()=>{const e="POST",t="GET",r=new XMLHttpRequest,o=new XMLHttpRequest,n=(e,t,r)=>{r.responseType="json",r.addEventListener("load",(()=>{200===r.status?e(r.response):t(`Статус ответа: ${r.status} ${r.statusText}`)})),r.addEventListener("error",(()=>{t("Произошла ошибка соединения")})),r.addEventListener("timeout",(()=>{t(`Запрос не успел выполниться за ${r.timeout} мс`)})),r.timeout=3e3};window.backend={send:(t,o,a)=>{r.open(e,"https://21.javascript.pages.academy/keksobooking"),n(o,a,r),r.send(t)},load:(e,r)=>{o.open(t,"https://21.javascript.pages.academy/keksobooking/data"),n(e,r,o),o.send()}}})(),window.backend.load((e=>{window.data=e.slice()}),window.utils.openErrorOnLoad),window.debounce=(e,...t)=>{let r=null;return()=>{r&&window.clearTimeout(r),r=window.setTimeout((()=>{e.apply(null,...t)}),500)}},(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),r=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),a=e.querySelectorAll(".map__checkbox"),i=()=>[...e.querySelectorAll(".map__checkbox:checked")].map((e=>e.value)),s=[e=>{switch(t.selectedIndex){case 0:return e;default:return e.offer.type===t.value}},e=>{switch(r.selectedIndex){case 1:return e.offer.price<5e4&&e.offer.price>1e4;case 2:return e.offer.price<1e4;case 3:return e.offer.price>5e4;default:return e}},e=>{switch(o.selectedIndex){case 0:return e;default:return e.offer.rooms===Number(o.value)}},e=>{switch(n.selectedIndex){case 0:return e;default:return e.offer.guests===Number(n.value)}},e=>i().length?i().every((t=>e.offer.features.includes(t))):e],d=()=>s.reduce(((e,t)=>e.filter(t)),window.data),c=window.debounce((()=>{window.pin.removePins(),window.map.closePopupCard(),window.pin.renderPins(d())}));window.filter={mapFilters:e,getFilteredData:d,activateFilters:()=>{t.addEventListener("change",c),r.addEventListener("change",c),o.addEventListener("change",c),n.addEventListener("change",c),a.forEach((e=>e.addEventListener("change",c)))},deactivateFilters:()=>{t.removeEventListener("change",c),r.removeEventListener("change",c),o.removeEventListener("change",c),n.removeEventListener("change",c),a.forEach((e=>e.removeEventListener("change",c)))}}})(),(()=>{const e=document.querySelector(".map"),t=e=>{"Escape"===e.key&&(e.preventDefault(),o())},r=()=>{const t=e.querySelector(".popup");t&&t.remove()},o=()=>{r(),window.pin.setDeactivePins(),document.removeEventListener("keydown",t)};window.map={openPopupCard:e=>{r(),window.card.renderCard(e),document.addEventListener("keydown",t)},closePopupCard:o,deactivateMap:()=>{e.classList.add("map--faded"),window.filter.deactivateFilters(),window.filter.mapFilters.reset(),window.filter.mapFilters.classList.add("map__filters--disabled"),[...window.filter.mapFilters.children].forEach((e=>e.setAttribute("disabled","true"))),window.pin.removePins(),window.movepin.setMainPinStartCoords(),document.querySelector(".popup")&&o()},activateMap:()=>{e.classList.remove("map--faded"),window.pin.renderPins(window.data),window.filter.activateFilters()},map:e}})(),(()=>{const e=document.querySelector(".map__pin--main"),t={x:e.style.top,y:e.style.left};window.movepin={dragNDropMainPin:t=>{let r={x:t.clientX,y:t.clientY};const o=t=>{t.preventDefault();const o=r.x-t.clientX,n=r.y-t.clientY;r={x:t.clientX,y:t.clientY};const a=(e,t,r)=>e>t?t+"px":e<r?r+"px":e+"px";e.style.top=a(e.offsetTop-n,546,46),e.style.left=a(e.offsetLeft-o,1169,-31),window.form.setActivatedPinAddress()},n=e=>{e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",n)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",n)},setMainPinStartCoords:()=>{e.style.top=t.x,e.style.left=t.y},mainPin:e}})(),(()=>{const e=window.map.map.querySelector(".map__pins"),t=document.querySelector("#pin").content.querySelector(".map__pin"),r=()=>{e.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>e.classList.remove("map__pin--active")))},o=e=>{const r=t.cloneNode(!0),o=r.querySelector("img");return r.style.cssText=`left: ${e.location.x-25}px; top: ${e.location.y-70}px`,o.src=e.author.avatar,o.alt=e.offer.title,r};window.pin={renderPins:t=>{const n=document.createDocumentFragment();for(let e=0;e<t.length&&e<5;e++)t[e].offer&&n.appendChild(o(t[e]));e.appendChild(n),window.filter.mapFilters.classList.remove("map__filters--disabled"),[...window.filter.mapFilters.children].forEach((e=>e.removeAttribute("disabled","true"))),e.querySelectorAll(".map__pin:not(.map__pin--main)").forEach(((e,t)=>e.addEventListener("click",(()=>{r(),e.classList.add("map__pin--active"),window.map.openPopupCard(t)}))))},removePins:()=>{e.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))},setDeactivePins:r}})(),(()=>{const e={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},t=window.map.map,r=document.querySelector("#card").content.querySelector(".map__card");window.card={renderCard:o=>{const n=(t=>{const o=r.cloneNode(!0),n=o.querySelector(".popup__avatar"),a=o.querySelector(".popup__title"),i=o.querySelector(".popup__text--address"),s=o.querySelector(".popup__text--price"),d=o.querySelector(".popup__type"),c=o.querySelector(".popup__text--capacity"),l=o.querySelector(".popup__text--time"),u=o.querySelectorAll(".popup__feature"),p=o.querySelector(".popup__features"),m=o.querySelector(".popup__description");n.src=t.author.avatar?t.author.avatar:n.remove(),a.textContent=t.offer.title?t.offer.title:a.remove(),i.textContent=t.offer.address?t.offer.address:i.remove(),s.textContent=t.offer.price?t.offer.price+"₽/ночь":s.remove(),d.textContent=t.offer.type?e[t.offer.type]:d.remove(),c.textContent=void 0!==(t.offer.rooms&&t.offer.guests)?`${t.offer.rooms} комнаты для ${t.offer.guests} гостей`:c.remove(),l.textContent=t.offer.checkin&&t.offer.checkout?`Заезд после ${t.offer.checkin}, выезд до ${t.offer.checkout}`:l.remove(),t.offer.features.length?[...u].filter((e=>!t.offer.features.some((t=>e.className.includes("--"+t))))).forEach((e=>p.removeChild(e))):p.remove(),m.textContent=t.offer.description?t.offer.description:m.remove();const v=o.querySelector(".popup__photos"),f=v.querySelector("img"),w=t.offer.photos;if(v.innerHTML="",w.length)for(let e=0;e<w.length;e++){const t=f.cloneNode(!0);t.src=w[e],v.appendChild(t)}else v.remove();return o})(window.filter.getFilteredData()[o]);t.insertBefore(n,t.lastElementChild),n.querySelector(".popup__close").addEventListener("click",window.map.closePopupCard)}}})(),(()=>{const e={palace:1e4,flat:1e3,house:5e3,bungalow:0},t=31,r={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},o=window.movepin.mainPin,n=document.querySelector(".ad-form"),a=n.querySelector("#address"),i=n.querySelector("#capacity"),s=n.querySelector("#room_number"),d=n.querySelector(".ad-form__reset"),c=n.querySelector("#title"),l=n.querySelector("#type"),u=n.querySelector("#price"),p=n.querySelector("#timein"),m=n.querySelector("#timeout"),v=e=>{e.preventDefault(),window.backend.send(new FormData(n),window.utils.openSuccessMessage,window.utils.openErrorOnUpload)},f=()=>window.main.deactivatePage(),w=e=>h(e.target.value),y=(e,t)=>{a.value=parseInt(o.style.left,10)+e+", "+(parseInt(o.style.top,10)+t)};a.setAttribute("readonly",!0),y(t,t);const h=e=>{[...i.options].forEach((t=>{t.disabled=!r[e].includes(t.value)})),i.value=e>3?0:e},E=()=>{const e=c.value.length;e<30?c.setCustomValidity("Еще "+(30-e)+" симв."):e>100?c.setCustomValidity("Удалите лишние "+(e-100)+" симв."):c.setCustomValidity(""),c.reportValidity()},_=()=>{u.placeholder=e[l.value],parseInt(u.value,10)<parseInt(u.placeholder,10)?u.setCustomValidity("Минимальная цена для данного типа жилья: "+u.placeholder):u.setCustomValidity(""),u.reportValidity()};window.form={deactivateForm:()=>{n.classList.add("ad-form--disabled"),n.querySelectorAll("fieldset").forEach((e=>e.setAttribute("disabled","true"))),n.reset(),h(s.value),y(t,t),l.removeEventListener("change",_),u.removeEventListener("input",_),c.removeEventListener("input",E),s.removeEventListener("change",w),n.removeEventListener("submit",v),d.addEventListener("click",f)},activateForm:()=>{y(t,84),n.classList.remove("ad-form--disabled"),n.querySelectorAll("fieldset").forEach((e=>e.removeAttribute("disabled","true"))),h(s.value),l.addEventListener("change",_),u.addEventListener("input",_),c.addEventListener("input",E),s.addEventListener("change",w),p.addEventListener("change",(()=>{m.value=p.value})),m.addEventListener("change",(()=>{p.value=m.value})),n.addEventListener("submit",v),d.addEventListener("click",f)},setActivatedPinAddress:()=>{y(t,84)}}})(),(()=>{const e=document.querySelector(".map__pin--main"),t=document.querySelector(".map"),r=()=>{window.map.deactivateMap(),window.form.deactivateForm()};r();const o=()=>{window.map.activateMap(),window.form.activateForm()};e.addEventListener("keydown",(e=>{"Enter"===e.key&&t.classList.contains("map--faded")&&o()})),e.addEventListener("mousedown",(e=>{0===e.button&&t.classList.contains("map--faded")&&o(),window.movepin.dragNDropMainPin("mousedown"),e.preventDefault()})),window.main={deactivatePage:r,activatePage:o}})()})();