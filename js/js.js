var _Document = document, arr_count = 0, zamanlama = null, sonuclar = {dvr:0, yvr:0, dgk:0, ynl:0};

function yaz(event){ 
  event.preventDefault();
  if( tus_kontrol(event.keyCode) ) {
	let _KeyCode = event.keyCode,
		kelime = arr[arr_count],
		harf = event.key,
		p_light = _Document.querySelector('p.light'),
		light = _Document.querySelector('.txt_next .light'),
		txt_prev = _Document.querySelector('.txt_prev'),
		canli_sonuc = _Document.querySelector('.canli_sonuc');
		/*
		let _regexp = new RegExp('^'+harf, "g"),
		sonuc = _regexp.exec( light.innerText ),
		sonraki = kelime.substr(_regexp.lastIndex-1, 1);
		if( sonuc !== null )
		*/
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
			let dgk = canli_sonuc.querySelectorAll('.dgk span');
			if(p_light.innerText != kelime){
				p_light.classList.remove("red");
				p_light.classList.add("err");
				sonuclar.ynl++;
				dgk[1].innerText = sonuclar.ynl;
			}
			if(light.nextElementSibling !== null){
				light.nextElementSibling.classList.add("light");
				p_light.classList.remove("light");
				txt_prev.innerHTML += '<p class="light"></p>';
				txt_prev.scrollLeft = txt_prev.scrollWidth;
				sonuclar.dgk++;
				light.remove();
				arr_count++;
				dgk[0].innerText = sonuclar.dgk;
				//light.parentNode.scrollLeft = light.nextSibling.offsetLeft - 310;
			}
			canli_sonuc.querySelector('.dks span').innerText = Math.round(sonuclar.dvr / 5);
			canli_sonuc.querySelector('.orn span').innerText = Math.round((sonuclar.dgk - sonuclar.ynl) / sonuclar.dgk * 100);
		  break;
		default: //Yaz
			if( zamanlama === null){
				GeriSay(Sonuclar);
				klavye();
				_Document.querySelector('.progress').classList.add("active");
				_Document.querySelector('.txt_typing').remove();
			}
			let vrs = canli_sonuc.querySelectorAll('.vrs span');
			if( harf==light.innerText.substring(0, 1) && p_light.innerText == kelime.substring(0, p_light.innerText.length) ){
				// (new RegExp('^['+harf+']', "gu")).test(light.innerText)
				sonuclar.dvr++;
				vrs[0].innerText = sonuclar.dvr;
				p_light.innerHTML += harf;
				light.innerText = light.innerText.substring(1);
				//light.innerHTML = kelime.replace(new RegExp('^'+sonuc[0], "g"),'<b>'+sonuc[0]+'</b>');
			}else if(light !== null){
				sonuclar.yvr++;
				p_light.innerHTML += harf;
				p_light.classList.add("red");
				vrs[1].innerText = sonuclar.yvr;
				_Document.querySelector('[data-key="'+_KeyCode+'"]').classList.add("err");
			}
			txt_prev.scrollLeft = txt_prev.scrollWidth;
	}
  }
}

function klavye(tur="q") {
	_Document.querySelector('.keyboard-base').innerHTML = "";
	let f = [
		{192:"~"}, {49:"1"}, {50:"2"}, {51:"3"}, {52:"4"}, {53:"5"}, {54:"6"}, {55:"7"}, {56:"8"}, {57:"9"}, {48:"0"}, {223:"*"}, {189:"-"}, {8:"Backspace"},
		{9:"Tab"}, {70:"F"}, {71:"G"},{219:"Ğ"}, {73:"I"}, {79:"O"}, {68:"D"}, {82:"R"}, {78:"N"}, {72:"H"}, {80:"P"}, {81:"Q"}, {87:"W"}, {13:"Enter"},
		{20:"CapsLock"}, {85:"U"}, {222:"İ"}, {69:"E"}, {65:"A"}, {221:"Ü"}, {84:"T"}, {75:"K"}, {77:"M"}, {76:"L"}, {89:"Y"}, {186:"Ş"}, {88:"X"},
		{16:"Shift"}, {"00":"><"}, {74:"J"}, {191:"Ö"}, {86:"V"}, {67:"C"}, {220:"Ç"}, {90:"Z"}, {83:"S"}, {66:"B"}, {190:"."}, {188:","}, {16:"Shift"},
		{17:"Ctrl"}, {18:"Alt"}, {32:""}, {18:"AltGr"}, {17:"Ctrl"}
	],
	q = [
		{192:"~"}, {49:"1"}, {50:"2"}, {51:"3"}, {52:"4"}, {53:"5"}, {54:"6"}, {55:"7"}, {56:"8"}, {57:"9"}, {48:"0"}, {223:"*"}, {189:"-"}, {8:"Backspace"},
		{9:"Tab"}, {81:"Q"}, {87:"W"}, {69:"E"}, {82:"R"}, {84:"T"}, {89:"Y"}, {85:"U"}, {73:"I"}, {79:"O"}, {80:"P"}, {219:"Ğ"}, {221:"Ü"}, {13:"Enter"},
		{20:"CapsLock"}, {65:"A"}, {83:"S"}, {68:"D"}, {70:"F"}, {71:"G"}, {72:"H"}, {74:"J"}, {75:"K"}, {76:"L"}, {186:"Ş"}, {222:"İ"}, {188:","},
		{16:"Shift"}, {"00":"><"}, {90:"Z"}, {88:"X"}, {67:"C"}, {86:"V"}, {66:"B"}, {78:"N"}, {77:"M"}, {191:"Ö"}, {220:"Ç"}, {190:"."}, {16:"Shift"},
		{17:"Ctrl"}, {18:"Alt"}, {32:""}, {18:"AltGr"}, {17:"Ctrl"}
	];
	tur = (tur =="q") ? q : f;
	tur.forEach(function(key,i) {
		let insert = '<div class="key f" data-key="'+Object.keys(key)+'">'+Object.values(key)+'</div>';
		_Document.querySelector('.keyboard-base').innerHTML += insert;
	});
	//_Document.querySelector('.keyboard-base').style.display = "table";
}

function Sonuclar(){
	_Document.querySelector('#text').disabled = true;
	_Document.querySelector('.progress').classList.remove("active");
	_Document.querySelector('.keyboard-base').style.display = "table";
}

/* Geri Sayim */
function GeriSay(callback) {
	var dakika = _Document.querySelector('#dakika').value,
		timer = dakika*60, cont_sec = timer, minutes, seconds;
	if(zamanlama !== null)
		clearInterval(zamanlama);
	zamanlama = setInterval(function () {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		
		_Document.querySelector('.progress.active').style.width = ((cont_sec - timer)*100)/cont_sec +"%";
		_Document.querySelector('.canli_sonuc circle').style.strokeDashoffset = ((cont_sec - timer)*314)/cont_sec+"px";
		_Document.querySelector('.sure span').textContent = minutes + ":" + seconds;

		if (--timer < 0) {
			clearInterval(zamanlama);
			callback();
		}
	}, 1000);
}
/* Geri Sayim Son */

function tus_kontrol(t){
	return [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 188, 90, 88, 67, 86, 66, 78, 77, 191, 220, 190, 32, 8].includes(t);
}




/*
//document.getElementById("yaz").addEventListener('click', event => {
document.getElementById("yaz").onmousedown = function() {
	this.querySelectorAll("a[data-ajax=true]").forEach(a => 
		a.onclick = function(e) {
			e.preventDefault();
			history.pushState("", "", this.href);
			yt_search( base64De(this.href.split("-").pop()) );
		}
	);
};
*/