function Key_Letter(event, word){
	let _KeyCode = event.keyCode,
		kelime = arr[arr_count],
		light = _Document.querySelector('.next .light');

	switch(_KeyCode) {
		case 8: //Geri Tusu
			if( /<u>.*<\/u>/.test(light.innerHTML) ){
				const regex = /<(u|b)>(.)<\/\1>([^<]*)$/;
				arr[arr_count] = light.innerHTML.match(regex)[2] + kelime;
				light.innerHTML = light.innerHTML.replace(regex, "$2$3");
			}
		  break;
		case 32: //Bosluk Tusu
			if( light.innerText == kelime )
				return false;

			if( /<u>.*<\/u>/.test(light.innerHTML) || kelime != "" ){
				light.classList.add("err");
				key_res.ynl++;
			}else{
				key_res.dgk++;
			}

			let nextElmt = light.nextElementSibling;
			if(nextElmt !== null){
				light.classList.remove("light");
				nextElmt.classList.add("light");
				arr_count++;
			}else{
				ResultsFinish();
			}

			let to_scroll = (nextElmt.offsetTop > nextElmt.scrollHeight) ? (nextElmt.offsetTop - nextElmt.offsetHeight) : 0;
			_Document.querySelector('.letter .txt_wrt .next').scrollTop = to_scroll;

			ResultsSet();
		  break;
		default: //Yaz
			if( word==kelime.substring(0, 1) ){
				key_res.dvr++;
				arr[arr_count] = kelime.slice(1);
				light.innerHTML = Replace_Str(light.innerHTML, word);
				_focus("active", _KeyCode);
			}else{
				key_res.yvr++;
				arr[arr_count] = kelime.slice(1);
				light.innerHTML = Replace_Str(light.innerHTML);
				_focus("err", _KeyCode);
			}
			if( setTime === null )
				StartTimer(ResultsFinish);
			ResultsSet();
		  break;
	}
	_line();
}

function _line(){
	let content = _Document.querySelector('.letter .txt_wrt .next'),
		light = content.querySelector('.light');
		position = light.querySelector('b:last-child, u:last-child'),
		line = content.parentElement.querySelector('.txt'),
		_left = (position ==null) ? light.offsetLeft : position.offsetLeft + position.offsetWidth;
		_top = (content.scrollTop > light.offsetHeight) ? light.offsetTop - content.scrollTop : light.offsetTop;

	line.style.top = _top + 'px';
	line.style.left =  _left+ 'px';

	line.style.animation = "none";
	line.offsetWidth; /* Animation Reset */
	line.style.animation = "line 1s 2s infinite";
}

function Replace_Str(fing, str=null) {

    return fing.replace(/(<\/[^>]+>\s*|^)([^<])/, function(match, optionalClosingTag, firstChar) {
    	str = (str==null) ? '<u>'+firstChar+'</u>' : '<b>'+str+'</b>';
        return (optionalClosingTag || '') + firstChar.replace(firstChar, str);
    });
	
	// var a = new RegExp("(?<!<[^>]*?)(?<!<b[^>]*?>)(?<!<u[^>]*?>)"+word+"(?![^<]*?</(b|u)>)(?!<[^>]*?)", "i");
	/*
	const result1 = htmlString1.replace(/(<\/[^>]+>\s*|^)([^<])/, (match, optionalClosingTag, firstChar) => {
	    return (optionalClosingTag || '') + firstChar.replace(firstChar, 'X');
	});
	
    return fing.replace(/(<\/[^>]+>\s*|^)([^<])/, function(match, optionalClosingTag, firstChar) {
        return (optionalClosingTag || '') + firstChar.replace(firstChar, str);
    });
    */
}