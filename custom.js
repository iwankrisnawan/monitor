function readApiThingSpeak(){
	$("#suhu").html("");
	$("#kelembaban").html("");
	$.getJSON("https://api.thingspeak.com/channels/1269281/feeds.json?results=5", function(data){
		$.each(data.feeds, function(i){
			$("#suhu").append(
				`<li>
					${data.feeds[i].created_at} <span class="pull-right"><b>${data.feeds[i].field1}</b> </span>
				</li>`
			);

			$("#kelembaban").append(
				`<li>
					${data.feeds[i].created_at} <span class="pull-right"><b>${data.feeds[i].field2}</b> </span>
				</li>`
			);
		});
	});
	console.log('yes');

	setTimeout(readApiThingSpeak, 5000);
}
readApiThingSpeak();