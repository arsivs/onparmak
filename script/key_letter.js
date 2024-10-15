

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