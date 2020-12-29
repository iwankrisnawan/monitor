function checkIcon(dataBefore, dataNow){
	if(dataBefore > dataNow){
		return 'trending_down';
	}
	if(dataBefore < dataNow){
		return 'trending_up';
	}
	else{
		return 'trending_flat';
	}
}

function readApiThingSpeak(){
	$.getJSON("https://api.thingspeak.com/channels/1269281/feeds.json?results=11", function(data){
		let lastData = data.feeds[data.feeds.length-1];
		let dataUpdate = {suhu:'',kelembaban:''};
		$.each(data.feeds, function(i){
			if (i > 0){
				let dataIconSuhu = checkIcon(data.feeds[i-1].field1, data.feeds[i].field1);
				let dataIconKelembapan = checkIcon(data.feeds[i-1].field2, data.feeds[i].field2);

				dataUpdate['suhu'] = dataUpdate['suhu'] + `<li><i class="fa fa-clock-o"></i> ${moment(data.feeds[i].created_at).format("HH:mm:ss")} <span class="pull-right"><b>${data.feeds[i].field1.replace('.00','')}&deg</b> <i class="material-icons">${dataIconSuhu}</i> </span></li>`;
				dataUpdate['kelembaban'] = dataUpdate['kelembaban'] + `<li><i class="fa fa-clock-o"></i> ${moment(data.feeds[i].created_at).format("HH:mm:ss")} <span class="pull-right"><b>${data.feeds[i].field2.replace('.00','')}&deg</b> <i class="material-icons">${dataIconKelembapan}</i> </span></li>`;
			}
		});

		$('#suhu_log').html(dataUpdate['suhu']);
		$('#kelembaban_log').html(dataUpdate['kelembaban']);

		$('#suhu_now').html(`${lastData.field1.replace('.00','')}&deg`);
		$('#kelembaban_now').html(`${lastData.field2.replace('.00','')}&deg`);
	});

	setTimeout(readApiThingSpeak, 5000);
}
readApiThingSpeak();