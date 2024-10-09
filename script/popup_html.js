function popup_html(res){
  var html = [];
  html["keyboard_select"] = '<h1>Klavye Tipi</h1>\
	<div class="middle">\
		<div onclick="bg_popup_select(\'keyb_lang\', this)" data-keyb="tr_q">Türkçe Q</div>\
		<div onclick="bg_popup_select(\'keyb_lang\', this)" data-keyb="tr_f">Türkçe F</div>\
		<div onclick="bg_popup_select(\'keyb_lang\', this)" data-keyb="en_y">English QY</div>\
		<div onclick="bg_popup_select(\'keyb_lang\', this)" data-keyb="en_z">English QZ</div>\
	</div>';

	_Document.querySelector('.bg_popup').innerHTML = '<div class="content">'+html[res]+'</div>';
}
