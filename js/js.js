var _Document = document, arr_count = 0, zamanlama = null, arr = [], sonuclar = {dvr:0, yvr:0, dgk:0, ynl:0};

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
			}else{
				clearInterval(zamanlama);
				Sonuclar();

			}
			canli_sonuc.querySelector('.dks span').innerText = Math.round(sonuclar.dvr / 5);
			canli_sonuc.querySelector('.orn span').innerText = Math.round((sonuclar.dgk - sonuclar.ynl) / sonuclar.dgk * 100);
		  break;
		default: //Yaz
			if( zamanlama === null){
				GeriSay(Sonuclar);
				klavye();
				_Document.querySelector('.progress').classList.add("active");
				_Document.querySelector('.txt_typing').style.display = "none";
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
	_Document.querySelector('.sure span').innerHTML = '<i class="icon-reload" onclick="klavye_yenile();"></i>';
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

function klavye_yenile(){
	if(zamanlama !== null)
		clearInterval(zamanlama);
	arr = [];
	arr_count = 0;
	zamanlama = null;
	sonuclar = {dvr:0, yvr:0, dgk:0, ynl:0};

	_Document.querySelector('.txt_prev').innerHTML = '<p class="light"></p>';
	_Document.querySelector('.sure span').innerHTML = '00:00';
	_Document.querySelector('.keyboard-base').style.display = "none";
	_Document.querySelector('.txt_typing').style.display = "block";
	_Document.querySelector('.canli_sonuc circle').style.strokeDashoffset = "0px";
	_Document.querySelector('.progress').classList.remove("active");
	_Document.querySelector('#text').disabled = false;
	[ '.dks span', '.orn span', '.dgk span', '.vrs span', '.dgk .icon', '.vrs .icon'].forEach(function( iden ) {
		_Document.querySelector(iden).innerHTML = "0";
	});
	klavye_kelimeler();
}

function klavye_kelimeler(){
	var bin = ['basın','geliyor','buradan','acı','trafik','sıra','hal','gelişmek','gelişme','cilt','izin','dinlemek','sınır','tamamen','takım','derece','yararlanmak','zaman','parça','firma','modern','teknik','sen','denmek','az','varlık','yüksek','çözüm','aşırı','bazen','beyaz','aşağı','akşam','köşe','sorumluluk','arka','beden','an','banka','özel','üstelik','yine','kalan','kullanılmak','öğretmen','sınıf','yürek','şarap','yedi','kullanmak','ilişki','hatırlamak','kenar','karşılamak','sağ','hareket','hızlı','ilke','çalışmak','bundan','işletme','demokrasi','olanak','sonuç','birey','korumak','işte','görünmek','belirtilmek','bina','besin','baba','sanat','pazar','etkilemek','karşılık','hizmet','denge','yabancı','kamu','destek','karşılaşmak','güçlü','üzerine','konuşmak','grup','geri','sinema','dikkat','kuruluş','duvar','değil','duymak','sözetmek','güvenlik','sunulmak','site','kişi','geçmek','defa','bağlı','yasa','paylaşmak','değişim','hoş','yoksa','on','basmak','bilmek','lazım','üzerinde','ayrıca','cevap','rağmen','yetmek','öykü','din','satış','toplumsal','kötü','kulak','birinci','toplantı','yükselmek','kitap','vatandaş','hava','kol','dolayısıyla','istemek','araba','kapanmak','yapıyorsun','giderek','kapı','temiz','vergi','ise','bunu','mağaza','anlayış','görüntü','geniş','eylem','yazı','kimse','kazanmak','söylenmek','katkı','yağ','koltuk','dayanmak','aday','fiyat','belirlenmek','çaba','kontrol','yapmak','mutfak','gelmek','özellik','hedef','isim','kanal','dilemek','bebek','ya','yönetici','meyve','oturmak','boyut','henüz','ağabey','toplamak','internet','seçmek','uç','sigara','asıl','sanmak','yatak','bağlanmak','meslek','savaş','eski','takılmak','ayırmak','boyunca','kadın','üretim','günlük','birden','sorun','benzer','dönmek','ücret','ilerlemek','çalmak','şiir','ülke','yer','burada','fotoğraf','göre','marka','herkes','uyumak','belirtmek','artış','ders','karanlık','yarar','abla','tabi','sormak','sayfa','atmak','enerji','otomobil','doğmak','orman','görev','uçak','öğrenmek','çok','getirmek','büyük','dönüşmek','tarz','uymak','nerede','ifade','sokak','spor','sanatçı','açıklamak','kere','azalmak','el','çevre','gülmek','hayal','ora','küçük','çeşitli','biliyorsun','yapı','birim','biraz','oluşturmak','bu','içmek','yok','düşük','bölüm','sağlık','üzeri','gizli','arkadaş','vermek','herzaman','gitmek','doğa','inanmak','sonra','ayrı','okul','tekrar','güç','göstermek','aslında','toprak','ulaşmak','anlatmak','boyun','varmak','yüzünden','merkez','dünya','yalnız','tuz','eleman','ana','yemek','kilo','polis','düşünce','binmek','bile','baş','evet','kent','vitamin','yaprak','dört','söz','görmek','anlam','etmek','malzeme','yazmak','iletişim','birçok','ihtiyaç','bağırmak','belli','ben','yayımlanmak','sol','ses','sene','ev','maç','dil','yoğun','aile','fazla','üç','hem','gaz','para','bey','yeterli','yeni','vücut','zarar','gene','tutulmak','yanıt','taraf','üstünde','bozulmak','iyi','kesin','farklı','yazılmak','hak','gidelim','korkmak','roman','farketmek','mesele','silah','reklam','kırmızı','oysa','duygu','soru','şarkı','yaş','milyar','ceza','sabah','bütün','yaşamak','şekil','hastalık','ağlamak','düşmek','yanısıra','saygı','soğuk','gerçek','sağlanmak','adet','uluslararası','veya','okur','niye','mücadele','iç','başlamak','hızla','girmek','olay','hikaye','içeri','önce','gönül','ama','oluyor','hesap','tüketici','beri','gazeteci','çizmek','boş','bacak','değiştirmek','diye','müdür','kadar','cadde','ağırlık','geçmiş','burun','teşekkür','sayılmak','öte','paşa','ayrılmak','ölüm','kurulmak','için','o','istiyorsun','müşteri','var','servis','problem','yayın','çünkü','doktor','rahat','haber','yüzden','göz','hazırlamak','toplam','süre','birer','pencere','dakika','kardeş','sağlıklı','ilaç','kurum','çıkarılmak','iş','gibi','enflasyon','içinde','birşey','boy','otobüs','bilgi','cami','balık','evlenmek','önem','faiz','suç','çıkmak','kanun','kural','yönetim','sevgi','önemli','faaliyet','anlamak','erkek','sırt','kimlik','toplanmak','bunlar','bakış','şimdi','başarılı','güven','seçim','yaklaşmak','tatlı','baskı','güneş','cam','gerekli','kalkmak','işçi','aynı','akıl','yeşil','kısa','selam','akmak','okumak','büyümek','düşünmek','üye','birbiri','seyretmek','yapılmak','anne','kısaca','kalite','mahalle','art','başka','pekala','tehlike','hemen','düzenlemek','uzatmak','mısın','çevirmek','şart','koşmak','herşey','ad','tip','ile','devlet','örnek','zor','dergi','tarih','yıl','geçen','canlı','ki','ortam','durmak','yakalamak','ait','hayır','yol','yaşam','uzman','tek','oldukça','kimi','ince','ister','giriş','yaşlı','araç','yarı','inanç','yerine','kılmak','karşı','dış','köpek','sıcaklık','artırmak','mutlaka','dolayı','iyice','kurtulmak','fark','asker','geliştirmek','kafa','halk','mal','miktar','eğitim','almak','düzen','sokmak','altın','saat','en','alt','çizgi','izlemek','hastahane','biri','bir','resim','sıcak','hazırlanmak','şey','sahne','ortak','değilim','yaptırmak','bilinç','kullanım','uğraşmak','köy','yaratmak','dolu','adres','ve','hücre','rol','kapatmak','et','ikinci','daire','cihaz','dostum','belki','ruh','koca','birlik','hata','uzanmak','uygun','olma','hafif','politika','televizyon','ön','kalmak','fakat','adım','alan','ağır','sadece','belirlemek','rüzgar','bilinmek','süt','birisi','makine','talep','hız','ağız','tanımak','koşul','durum','tedavi','görüşmek','alışveriş','kas','özgürlük','yatırım','sert','etraf','kaçmak','uygulama','elektrik','daha','karıştırmak','beş','kavram','yeniden','ürün','açı','böyle','özellikle','parmak','tür','gelen','artık','kahve','güzel','hiç','oğul','konu','korku','koku','aşk','mekan','doğal','dönem','şirket','aşmak','yalnızca','kaldırmak','dün','yetenek','yüz','yani','dolaşmak','yaklaşık','örneğin','yüzde','eklemek','gelecek','dışarı','şöyle','sıkıntı','biçim','çıkarmak','zaten','top','çay','kaybetmek','yumurta','temel','beraber','çekmek','sürücü','üçüncü','hangi','açık','genç','kredi','vakit','hoca','saç','üst','geç','yan','oda','plan','zevk','her','görüş','denilmek','unutmak','at','taş','yukarıda','bahçe','acaba','sana','tam','çıkar','sanki','seninle','ekonomik','edilmek','bırakmak','oyun','yakmak','söylemek','çiçek','otel','hayat','değişmek','çoğu','yaz','artmak','yazar','değişiklik','imkan','kat','hala','hakkında','bilim','gün','mümkün','yavaş','sunmak','piyasa','gerek','proje','içerisi','etki','davranış','sevgili','satmak','eşya','hele','kaç','uzun','böylece','kriz','değişik','hergün','öyle','yönelik','atılmak','saye','yayılmak','bulunmak','cumhuriyet','renk','kültür','yanlış','siz','ölçü','göndermek','gider','öğrenci','tepki','toplum','ilgilenmek','sağlamak','vurmak','işlem','sigorta','lira','getirilmek','öldürmek','sürdürmek','cümle','türlü','kesmek','sonunda','saymak','hatta','gerekmek','çocuk','giymek','mesela','şehir','millet','son','bakan','üzere','davranmak','ölmek','uygulanmak','peki','ilk','risk','gelir','kez','su','üniversite','ara','uzak','madde','teknoloji','salon','kız','öteki','çeşit','birlikte','hayvan','dost','onlar','organ','kesilmek','ek','hiçbir','genel','ticaret','zengin','yakın','örgüt','ayak','düşünülmek','sayı','çalışma','masa','biz','demek','bakmak','birkaç','metre','orada','ciddi','beyan','gerçekten','müzik','pek','tutmak','orta','diğer','karışmak','batı','açılmak','ışık','tüm','yıldız','kalp','üstüne','nokta','film','deniz','yön','kaza','sevmek','tamam','hasta','derin','yardım','işlemek','herhangibir','süreç','oynamak','verilmek','meydan','hepsi','meclis','yanmak','ilgili','üretmek','belge','milyon','çağ','iki','sürmek','medya','ay','taşımak','koymak','katılmak','başkan','hissetmek','içermek','gazete','numara','oluşmak','anlaşılmak','parti','kurmak','basit','kelime','kendi','kim','asla','kan','değerlendirmek','genellikle','amaç','bitki','aşama','sebep','dükkan','ödemek','buna','beyin','kısım','hafta','bakanlık','beklemek','adam','fikir','üretilmek','inmek','bura','benzemek','hukuk','can','nasıl','geçirmek','başarı','fırsat','bölge','yaşanmak','normal','hep','uygulamak','tane','şu','araştırma','belediye','elbette','dağ','yürümek','telefon','görülmek','kesim','sektör','ilginç','kağıt','sistem','bağlamak','deri','bilgisayar','laf','yıllık','alınmak','model','mevcut','bitmek','ünlü','neredeyse','kurtarmak','eser','ağaç','ateş','sahip','düzey','yatmak','olmak','ekmek','kolay','gerçekleşmek','ileri','yöntem','bitirmek','doğru','doldurmak','açmak','eğer','oran','istek','kaynak','neden','incelemek','sosyal','hazır','nitelik','bulmak','çekilmek','sürekli','karar','götürmek','hanım','ekonomi','öteki','tavır','uğraşmak','insan','program','hükümet','değer','onun','ancak','aramak','istenmek','bugün','sözcük','yüzyıl','bunun','ilgi','ne','sanayi','bazı','gece','eş','mektup','idi'].sort(() => Math.random() - 0.5);

	var sec = _Document.querySelector('#tur').value;
	arr = (sec ==200) ? bin.slice(0,200) : bin;
	var yaz ="";
	arr.forEach(element =>yaz += '<p>'+element+'</p>');
	delete yaz;
	_Document.querySelector('.yaz .txt_next').innerHTML = yaz;
	_Document.querySelector('.txt_next p').classList.add("light");
	_Document.querySelector('#text').focus();
}
klavye_kelimeler();

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

function All_Array(sec,){
	_Document.querySelectorAll(''+sec+'').forEach(function(div) {div.classList.toggle('none')});
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