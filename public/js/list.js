$(document).ready(function() {

	$(document).ready(function() {
		$("#back").click(function() {
			if ($(this).parent('li').attr('class') == 'disabled')
				return;
			var current = parseInt($('.page').find('a').text());
			window.location.href = './' + (current - 1);
		})

		$("#forward").click(function() {
			if ($(this).parent('li').attr('class') == 'disabled')
				return;
			var current = parseInt($('.page').find('a').text());
			window.location.href = './' + (current + 1);
		})
	})


	//删除记录
	$('.del').click(
		function(e) {
			var target = $(e.target);
			var id = target.data('id');
			var tr = $('.item-id-' + id);
			$.ajax({
					type: 'DELETE',
					url: '../list?id=' + id
				})
				.done(function(results) {
					if (results.success === 1) {
						if (tr.length > 0) {
							tr.remove();
						}
					}
				})
		}
	)
})