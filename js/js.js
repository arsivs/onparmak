var _Document = document;

function gece(e){

	e.classList.toggle('gece');
	_Document.querySelector('body').classList.toggle('gece');
	alert();
}

function msg(m,c){

	var cont = _Document.querySelector('.notif-cont'),
		div = '<div class="notif '+c+'">'+m+'</div>';
		
	cont.style.display = "block";
	cont.insertAdjacentHTML('beforeend', div);
	var notif = cont.querySelector('.notif');
	setTimeout(function(){
		cont.querySelector('.notif').remove();
	},2400);
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