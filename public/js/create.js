$(document).ready(function() {

	// 动态加载info的内容
	var um = window.um;
	var infoContent = $("#infoContent").val();
	um.setContent(infoContent);

	// 实例化datetime - picker
	$(".form_datetime").datetimepicker({
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		todayBtn: true,
	});

})