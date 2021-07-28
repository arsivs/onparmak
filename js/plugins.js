document.querySelector(".volum").onmousedown = function(event) {
	event.preventDefault(); // prevent selection start (browser action)
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	var _this = this,
		bar = _this.querySelector('.bar'),
		_thisWidth = _this.offsetWidth,
		newLeft = event.pageX - _this.offsetLeft;
		//newTop = event.pageY - _this.offsetTop;
	bar.style.width = (newLeft * 100) / _thisWidth + '%';
	function onMouseMove(event) {
		let newLeft = event.pageX - _this.offsetLeft;
		(newLeft < 0) ? newLeft = 0 : (newLeft > _thisWidth) ? newLeft=_thisWidth : newLeft;
		bar.style.width = (newLeft * 100) / _thisWidth + '%';
	}
	function onMouseUp() {
		document.removeEventListener('mouseup', onMouseUp);
		document.removeEventListener('mousemove', onMouseMove);
	}
};

function views(number) {
	var SI_POSTFIXES = ["", "K", "Mn", "Bn", "Tn", "P", "E"];
	// what tier? (determines SI prefix)
	var tier = Math.log10(Math.abs(number)) / 3 | 0;
	// if zero, we don't need a prefix
	if(tier == 0) return number;
	// get postfix and determine scale
	var postfix = SI_POSTFIXES[tier];
	var scale = Math.pow(10, tier * 3);
	// scale the number
	var scaled = number / scale;
	// format number and add postfix as suffix
	var formatted = scaled.toFixed(1) + '';
	// remove '.0' case
	if (/\.0$/.test(formatted))
		formatted = formatted.substr(0, formatted.length - 2);

	return formatted + postfix;
}

function tarih(previous) {
	var msPerMinute = 60;
	var msPerHour = msPerMinute * 60;
	var msPerDay = msPerHour * 24;
	var msPerMonth = msPerDay * 30;
	var msPerYear = msPerDay * 365;
	var elapsed = parseInt(new Date().getTime() / 1000) - parseInt(new Date(previous).getTime() / 1000);
	if (elapsed < msPerMinute) {
		if (elapsed < 20) {
			return 'az önce';
		} else {
			return Math.round(elapsed) + ' saniye önce';
		}
	} else if (elapsed < msPerHour) {
		return Math.round(elapsed / msPerMinute) + ' dakika önce';
	} else if (elapsed < msPerDay) {
		return Math.round(elapsed / msPerHour) + ' saat önce';
	} else if (elapsed < msPerMonth) {
		return Math.round(elapsed / msPerDay) + ' gün önce';
	} else if (elapsed < msPerYear) {
		return Math.round(elapsed / msPerMonth) + ' ay önce';
	} else {
		return Math.round(elapsed / msPerYear) + ' yıl önce';
	}
}

function msg(m,c){

	var cont = document.querySelector('.notif-cont'),
		div = '<div class="notif '+c+'">'+m+'</div>';
		
	cont.style.display = "block";
	cont.insertAdjacentHTML('beforeend', div);
	var notif = cont.querySelector('.notif');
	setTimeout(function(){
		cont.querySelector('.notif').remove();
	},2400);
}


getJSON = function(url, params, callback) {
	var xhr = new XMLHttpRequest(),
		prog = document.querySelector('.progress');
	xhr.open('GET', url+encodeDataToURL(params), true);
	xhr.responseType = 'json';
	xhr.timeout = 30000;
	xhr.send();
	prog.style.display = "block";

	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			//callback(status, xhr.response);
			msg("Bir şeyler yanlış gitti", "error");
			console.log('Bir şeyler yanlış gitti: ' + err);
		}
	};
	xhr.onreadystatechange = function(event) {
		if (xhr.readyState == 4) {
			prog.style.display = "none";
		}
	}
	xhr.ontimeout = function (e) {
		msg("Çok uzun sürdü tekrar dene!", "error");
	};
	xhr.onerror = function() {
		msg("İnternet bağlantısı yok!", "error");
	};
};

/* Base64 */
function base64En(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
	function toSolidBytes(match, p1) {
		return String.fromCharCode('0x' + p1);
	})).replace("=","");
}
function base64De(str) {
	return decodeURIComponent(atob(str).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}
/* Base64 And */