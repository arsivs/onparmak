var _Document = document, arr=[], arr_count=0, setTime=null, key_res={dvr:0, yvr:0, dgk:0, ynl:0};

window.onload = function() {

	_Words();

	_Document.querySelector('.txt_contain').onfocus = function(e){
		console.log(e);
		if(e.target.classList.contains("disabled") === true)
			e.target.blur();
		e.target.onkeydown = function(event){
			event.preventDefault();
			var w = _KeyCheck( event.keyCode, (event.getModifierState("CapsLock") || event.shiftKey) ? 1 : 0 );
			if(w !== false ) {
				if(event.target.classList.contains("word")){
					Key_Word(event, w);
				}else if(event.target.classList.contains("letter")){
					Key_Letter(event, w);
				}
			}
		}
	};

	_Document.querySelector('.set_contain').onmouseup = function(e) {
		e.preventDefault();
		if(e.target.tagName != "BUTTON" )
			return false;
		let parent = e.target.parentElement,
			c_value = parent.classList.value,
			data = e.target.dataset;

		if(c_value == "left"){
			/* Sol Kısım Start */
			if(data.id == "word" || data.id == "letter"){
				_Document.querySelector('.txt_contain').classList.remove("word", "letter");
				_Document.querySelector('.txt_contain').classList.add( data.id );
				Restart(data.id);
			}
			if(data.id == "time"){
				e.target.classList.toggle("active");
				_Document.querySelector('.set_contain .right').classList.toggle('time');
			}else{
				parent.querySelector(".active").classList.remove("active");
				e.target.classList.add("active");
			}
			/* Sol Kısım End */
		}else{
			/* Sağ Kısım Start */
			if(data.word){
				parent.querySelector('button[data-word].active').classList.remove("active");
				e.target.classList.add("active");
				_Words();
			}else if(data.time){
				parent.querySelector('button[data-time].active').classList.remove("active");
				e.target.classList.add("active");
			}
			/* Sol Kısım End */
		}
	}

	_Document.querySelector('.bg_popup').onmousedown = function(e) {
	  if( e.target.classList.contains('bg_popup') ){
		bg_popup_close();
	  }
	}
}

function Restart(rst){
	reset = (rst == "restart") ? _Document.querySelector('.set_contain button[data-id].active').dataset.id : rst;
	key_res.dvr = 0;
	key_res.yvr = 0;
	key_res.dgk = 0;
	key_res.ynl = 0;
	ResultsSet();
	_Words();
	_Document.querySelector('.txt_contain').classList.remove("disabled");
	_Document.querySelector('.txt_wrt .txt').style.top = "0px";
	_Document.querySelector('.txt_wrt > .prev').innerHTML = '<p class="light"></p>';
	_Document.querySelector('.txt_contain').focus();

	if(reset == "word"){
		_Document.querySelector('.txt_wrt .txt').style.left = "0px";
		_Document.querySelector('.txt_wrt .typing').style.display = "block";
	}else if(reset == "letter"){
		_Document.querySelector('.txt_wrt .txt').style.left = "10px";
		_Document.querySelector('.txt_wrt .typing').style.display = "none";
		_Document.querySelector('.letter .txt_wrt .next').scrollTop = 0;
	}
	_Words();
	_Document.querySelector('.results circle').style.strokeDashoffset = 0;
	if( setTime !== null ){
		clearInterval(setTime);
		setTime = null;
		_Document.getElementById("t").innerText = "00:00";
	}
}

function ResultsSet(){
	let result = _Document.querySelector('.results'),
		dgk = result.querySelectorAll(".dgk span"),
		vrs = result.querySelectorAll('.vrs span');

	dgk[0].innerText = key_res.dgk;
	dgk[1].innerText = key_res.ynl;
	vrs[0].innerText = key_res.dvr;
	vrs[1].innerText = key_res.yvr;
	result.querySelector('.dks').innerText = Math.round((key_res.dvr -  key_res.yvr) / 5);
	if(arr_count)
		result.querySelector('.orn').innerText = Math.round((key_res.dgk * 100) / arr_count);
}

function ResultsFinish(){
	let sec = _Document.querySelector('.txt_contain');
	sec.classList.add("disabled");
	sec.blur();
	console.log("Bitti");
}

function _KeyCheck(key,caps=null){
	res = {
		48:"0", 49:"1", 50:"2", 51:"3", 52:"4", 53:"5", 54:"6", 55:"7", 56:"8", 57:"9", // KeybordNumPad
		96:"0", 97:"1", 98:"2", 99:"3", 100:"4", 101:"5", 102:"6", 103:"7", 104:"8", 105:"9", // NumPad
		81:"qQ", 87:"wW", 69:"eE", 82:"rR", 84:"tT", 89:"yY", 85:"uU", 73:"ıI", 79:"oO", 80:"pP", 219:"ğĞ", 221:"üÜ",
		65:"aA", 83:"sS", 68:"dD", 70:"fF", 71:"gG", 72:"hH", 74:"jJ", 75:"kK", 76:"lL", 186:"şŞ", 222:"iİ", // 188:",",
		90:"zZ", 88:"xX", 67:"cC", 86:"vV", 66:"bB", 78:"nN", 77:"mM", 191:"öÖ", 220:"çÇ", // 190:".",
		32:"", 8:"Back"
	};

	if(key in res){
		return res[key][caps];
	}else{
		return false;
	}


	// k = (k == 188) ? 191 : (k == 190) ? 200 : k;
	/*
	delete res[191];
	delete res[220];
	res[188] = "öÖ";
	res[190] = "çÇ";
	*/
	//return res[key][caps];
}

function keyboard_select(){
	popup_html("keyboard_select");
	let select = _Document.querySelector('.keyb_lang'),
		keyb = _Document.querySelector(".middle [data-keyb="+select.dataset.lang+"]");
	keyb.classList.add("active");
	_Document.querySelector(".bg_popup").classList.add("active");
}

function bg_popup_select(pop, event=NULL){
	switch(pop) {
	  case "keyb_lang": //Geri Tusu
		let select = _Document.querySelector('.keyb_lang');
		select.dataset.lang = event.dataset.keyb;
		select.querySelector('span').innerText = event.innerText;
		_Keyboard();
		bg_popup_close();
	  break;
	}
}

function bg_popup_close(){
	let _This = _Document.querySelector('.bg_popup');
	_This.classList.add("none");
    setTimeout(function() {
        _This.classList.remove("active", "none");
    }, 300)
}

function _focus(add, key){
	let _key = _Document.querySelector('.keyboard div[data-key="'+key+'"]');
	if(_key.getAnimations()[0]){
		_key.getAnimations().forEach((anim) => {
			anim.cancel();
			anim.play();
		});
	}else {
		_key.classList.add(add);
	}
	_key.onanimationend = () => {
		_key.classList.remove(add);
	};
}

function StartTimer(callback){
	if(setTime !== null)
		clearInterval(zamanlama);
	var time = _Document.querySelector("button.active[data-time]").dataset.time,
		timer = ( time < 10 ) ? time*60 : time, time=timer, minutes, seconds;

	setTime = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		// ((time - timer)*100)/time + "%";
		_Document.querySelector('.results circle').style.strokeDashoffset = ((time - timer)*240)/time;
		_Document.getElementById("t").innerText = minutes + ":" + seconds;

		if (--timer < 0) {
			clearInterval(setTime);
			setTime = null;
			callback();
		}
	}, 1000);
}

function include(url) {
	var script  = document.createElement('script');
	script.src  = "//arsivs.github.io/onparmak/script/"+url;
	script.type = 'text/javascript';
	script.defer = true;
	document.getElementsByTagName('head').item(0).appendChild(script);
}

include("key_word.js");
include("key_letter.js");
include("keyboard.js");
include("words.js");
include("popup_html.js");