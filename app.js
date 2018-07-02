function sound(){
    alert('소음 result is ');
    // todo 안드로이드에서 sound 값 받아서 웹 화면에 표시해야함
}
function vibration(){
    alert('진동 result is ');
    // todo 안드로이드에서 vibration 값 받아서 웹 화면에 표시해야함
}
function setMessage(arg) {
	var mainFrame = document.getElementById('textMessageFromApp');
	var createFrame = document.createElement("div");
	createFrame.innerHTML = arg;
	mainFrame.appendChild(createFrame);
}

function drawChart(v) {
	var legends = ['sound'];
	var seriesData = tui.util.map(tui.util.range(2), function (value, index) {
		var name = legends[index];
		var data = tui.util.map(tui.util.range(20), v);
		return {
			name: name,
			data: data
		};
	});
	var baseNow = new Date();
	var startSecond = baseNow.getSeconds() - seriesData[0].data.length - 1;
	var categories = tui.util.map(seriesData[0].data, function (value, index) {
		var hour = baseNow.getHours();
		var minute = baseNow.getMinutes();
		var second = startSecond + index;

		if (second < 0) {
			minute -= 1;
		}

		if (minute < 0) {
			hour -= 1;
		}
		return makeDate(hour, minute, (startSecond + index));
	});
	var container = document.getElementById('curve-chart');
	var data = {
		categories: categories,
		series: seriesData
	};
	var options = {
		chart: {
			width: 1160,
			height: 540,
			title: 'Concurrent users'
		},
		xAxis: {
			title: 'seconds',
			labelInterval: 3,
			tickInterval: 'auto'
		},
		yAxis: {
			title: 'users'
		},
		series: {
			spline: true,
			showDot: true,
			shifting: true
		},
		tooltip: {
			grouped: true
		}
	};
	var chart = tui.chart.lineChart(container, data, options);

	chart.on('load', function () {
		var index = categories.length;
		setInterval(function () {
			var now = new Date();
			var category = makeDate(now.getHours(), now.getMinutes(), now.getSeconds());
			var values = v;

			chart.addData(category, values);
			index += 1;
		}, 1000);
	});
}


function getRandom(start, end) {
    return start + (Math.floor(Math.random() * (end - start + 1)));
}

function zeroFill(number) {
    var filledNumber;

    if (number < 10) {
        filledNumber = '0' + number;
    } else {
        filledNumber = number;
    }

    return filledNumber;
}

function adjustTime(time, addTime) {
    addTime = addTime || 60;
    if (time < 0) {
        time += addTime;
    }
    return time;
}

function makeDate(hour, minute, second) {
    return zeroFill(adjustTime(hour, 24)) + ':' + zeroFill(adjustTime(minute)) + ':' + zeroFill(adjustTime(second));
}