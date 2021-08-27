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
