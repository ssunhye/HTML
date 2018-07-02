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

time=0;
function drawChart(value) {

	time++;
	//데이터 setting
	var data = google.visualization.arrayToDataTable([
		['date', 'values'],
		['time', 'value']
	]);
	
	//옵션 setting
	var options = {
		title: 'Sound Meter',
		curveType: 'function',
		legend: {
		position: 'bottom'
		}
	};

	//차트그리기
	var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
	chart.draw(data, options);
}