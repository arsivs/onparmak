function Key_Word(event, word){
	let _KeyCode = event.keyCode,
		kelime = arr[arr_count],
		prev = _Document.querySelector('.txt_wrt .prev'),
		p_light = _Document.querySelector('.prev .light'),
		light = _Document.querySelector('.next .light');

	switch(_KeyCode) {
		case 8: //Geri Tusu
			if(p_light.classList.contains("red")){
				p_light.innerText = p_light.innerText.slice(0, -1);
				if( p_light.innerText == kelime.substring(0, p_light.innerText.length) ){
					p_light.classList.remove("red");
				}
			}
		  break;
		case 32: //Bosluk Tusu
			if(!/[^\s]/.test(p_light.innerText) || arr_count >= arr.length){
				return false;
			}
			if(p_light.innerText != kelime){
				p_light.classList.remove("red");
				p_light.classList.add("err");
				key_res.ynl++;
			}else{ key_res.dgk++; }
			if(light.nextElementSibling !== null){
				light.nextElementSibling.classList.add("light");
				p_light.classList.remove("light");
				prev.insertAdjacentHTML("afterbegin", '<p class="light"></p>');
				light.remove();
				arr_count++;
			}else{
				p_light.classList.remove("light");
				clearInterval(setTime);
				setTime = null;
				ResultsFinish();
				//console.log("Erken bitti");
			}
			ResultsSet();
		  break;
		default: //Yaz
			if( setTime === null ){
				StartTimer(ResultsFinish);
				_Document.querySelector('.txt_wrt .typing').style.display = "none";
			}
			p_light.innerHTML += word;
			if( word==light.innerText.substring(0, 1) && p_light.innerText == kelime.substring(0, p_light.innerText.length) ){
				key_res.dvr++;
				light.innerText = light.innerText.substring(1);
				_focus("active", _KeyCode);
			}else if(light !== null){
				key_res.yvr++;
				p_light.classList.add("red");
				_focus("err", _KeyCode);
			}
			ResultsSet();
		  break;
	}
}