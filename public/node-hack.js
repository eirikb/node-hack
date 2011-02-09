$(function() {
	var $input = $('input'),
	$textArea = $('textarea'),
	append = function(line) {
		$textArea.val($textArea.val() + '\n' + line);
		$textArea.attr('scrollTop', $textArea.attr('scrollHeight'));
	},
	buffer = [],
	bufferPos = 0;

	$input.keypress(function(e)  {
		var line;
		if (e.keyCode === 13) {
			line = $input.val();
			$input.val('');
			buffer.push(line);
			bufferPos = buffer.length;
			$.get('/eval?query=' + encodeURIComponent(line), function(res) {
				append(res);
			});
		}
	});

	$input.keydown(function(e) {
		var currentPos = bufferPos;
		switch (e.keyCode) {
		case 38:
			bufferPos -= bufferPos > 0 ? 1: 0;
			change = true;
			break;
		case 40:
			bufferPos += bufferPos < buffer.length ? 1: 0;
			change = true;
			break;
		}
		if (currentPos != bufferPos) {
			$input.val(buffer[bufferPos]);
		}
	});
});

