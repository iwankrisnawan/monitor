function readApiThingSpeak(){
	$.getJSON("https://api.thingspeak.com/channels/1269281/feeds.json?results=10", function(data){
		let lastData = data.feeds[data.feeds.length-1];
		let dataUpdate = {suhu:'',kelembaban:''};
		$.each(data.feeds, function(i){
			dataUpdate['suhu'] = dataUpdate['suhu'] + `<li><i class="fa fa-clock-o"></i> ${moment(data.feeds[i].created_at).format("HH:mm:ss")} <span class="pull-right"><b>${data.feeds[i].field1.replace('.00','')}&deg</b> </span></li>`;
			dataUpdate['kelembaban'] = dataUpdate['kelembaban'] + `<li><i class="fa fa-clock-o"></i> ${moment(data.feeds[i].created_at).format("HH:mm:ss")} <span class="pull-right"><b>${data.feeds[i].field2.replace('.00','')}&deg</b> </span></li>`;
		});

		$('#suhu_log').html(dataUpdate['suhu']);
		$('#kelembaban_log').html(dataUpdate['kelembaban']);

		$('#suhu_now').html(`${lastData.field1.replace('.00','')}&deg`);
		$('#kelembaban_now').html(`${lastData.field2.replace('.00','')}&deg`);
	});

	setTimeout(readApiThingSpeak, 5000);
}
readApiThingSpeak();