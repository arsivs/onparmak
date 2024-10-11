function Key_Letter(event, word){
	let _KeyCode = event.keyCode,
		kelime = arr[arr_count],
		light = _Document.querySelector('.next .light'),
		prev = light.querySelector('.next .x1'),
		next = light.querySelector('.next .x2');

	switch(_KeyCode) {
		case 8: //Geri Tusu
			if(prev.classList.contains("red")){
				prev.innerText = prev.innerText.slice(0, -1);
				if( prev.innerText == kelime.substring(0, prev.innerText.length) ){
					prev.classList.remove("red");
				}
			}
		  break;
		case 32: //Bosluk Tusu
			if(!/[^\s]/.test(prev.innerText) || arr_count >= arr.length){
				return false;
			}
			if(prev.innerText != kelime){
				light.classList.add("err");
				key_res.ynl++;
			}else{
				key_res.dgk++;
				light.innerHTML = prev.innerText;
			}
			let nextElmt = light.nextElementSibling;
			if(nextElmt !== null){
				light.classList.remove("light");
				nextElmt.classList.add("light");
				nextElmt.innerHTML = '<p class="x1"></p><p class="x2">'+nextElmt.innerHTML+'</p>';

				to_scroll = (nextElmt.offsetTop > nextElmt.scrollHeight) ? (nextElmt.offsetTop - nextElmt.offsetHeight) : 0;
				_Document.querySelector('.letter .txt_wrt .next').scrollTop = to_scroll;
				arr_count++;
			}else{
				prev.classList.remove("prev");
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
			}
			prev.innerHTML += word;
			if( word==next.innerText.substring(0, 1) && prev.innerText == kelime.substring(0, prev.innerText.length) ){
				key_res.dvr++;
				next.innerText = next.innerText.substring(1);
				_focus("active", _KeyCode);
			}else if(next !== null){
				key_res.yvr++;
				prev.classList.add("red");
				_focus("err", _KeyCode);
			}
			ResultsSet();
		  break;
	}
	_line();
}

function _line(){
	let next_content = _Document.querySelector('.letter .txt_wrt .next'),
		line = _Document.querySelector('.letter .txt_wrt .txt'),
		light = next_content.querySelector('.light .x2'),
		l_top = (next_content.scrollTop > light.offsetHeight) ? light.offsetTop - next_content.scrollTop : light.offsetTop,
		l_left = light.offsetLeft;
	line.style.animation = "none";
	line.style.top = l_top + 'px';
	line.style.left = l_left + 'px';
	line.offsetWidth; /* Animation Reset */
	line.style.animation = "line 1s 2s infinite";
}