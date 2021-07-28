encodeDataToURL = (data) => {
	//return Object.keys(data).map(value => `${value}=${encodeURIComponent(data[value])}`).join('&');
	var parameters = [];
	for (var property in data) {
		if (data.hasOwnProperty(property)) {
			parameters.push(encodeURI(property + '=' + data[property]));
		}
	}
	return parameters.join('&');
}

selectKEYS = function() {
	return "AIzaSyCxx1AoS94GK9jCcdcy0MxspN7qOIw8n1k";
}

yt_search = function(id = null) {
	var params = {
		part: "id",
		type: "video",
		topicId: "/m/04rlf",
		videoCategoryId: "10",
		videoDuration: "medium",
		relevanceLanguage: "en",
		fields: "items(id/videoId)", //,nextPageToken
		key: selectKEYS()
	};
	if(id == null){
		var text = document.getElementById("text").value;
		params.q = text;
		params.maxResults = "50";
	}else {
		params.relatedToVideoId = id;
		params.maxResults = "49";
	}
	if(text != ""){
		getJSON("https://www.googleapis.com/youtube/v3/search?", params, function(err, data) {
			if (err === null) {
				if(id !== null)
					data.items.unshift({"id": {videoId: id}});
				yt_videos( data.items.map(function(i){ return i.id.videoId; }).join(",") );
			}
		});
	}else{
		msg("En az 3 karakter girin!", "warning");
	}
}

function yt_videos(ids){
	var params = {
		id: ids,
		part: "snippet,contentDetails,statistics",
		fields: "items(id,snippet/title,snippet/publishedAt,statistics/viewCount,contentDetails/duration)",
		key: selectKEYS()
	};
	getJSON("https://www.googleapis.com/youtube/v3/videos?", params, function(err, data) {
		if (err === null) {
			var res = [];
			data.items.forEach(function(item) {
				var	time = item.contentDetails.duration.match(/[0-9]+/g);
				(time[1] < 10) ? time[1] = 0+time[1] : (time[1] === undefined) ? time[1] = "00" : time[1];
				res.push({
					id: item.id,
					title: url_slug(item.snippet.title, {delimiter:' ', lowercase: false, alphanumeric: false}), //item.snippet.title,
					duration: time.join(":"),
					date: tarih(item.snippet.publishedAt),
					popularity: views(item.statistics.viewCount),
					url: url_slug(item.snippet.title)+"-"+base64En(item.id)
				});
			});
			yaz(res);
		}
	});
}