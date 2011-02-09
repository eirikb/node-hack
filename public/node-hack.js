$(function() {
	var $input = $('input'),
	$textArea = $('textarea'),
	append = function(line) {
		$textArea.val($textArea.val() + '\n' + line);
		$textArea.attr('scrollTop', $textArea.attr('scrollHeight'));
	};

	$input.keypress(function(e)  {
		var line;
		if (e.keyCode === 13) {
			line = $input.val();
			$input.val('');
			append('Sending: ' + line + '...');
			$.get('/eval?query=' + encodeURIComponent(line), function(res) {
				append(res);
			});
		}
	});
});

