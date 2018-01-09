let defaultRegex = /^(\d{1,2}-\d{1,2} \d{2}:\d{2}:\d{2}\.\d{3} \d+-\d+\/[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_] (v|d|i|w|e|a)\/((.|\s)*?): )/i;
$(document).ready(function() {
	$("#regex-area").attr("placeholder", "Default: " + defaultRegex);
	//$(".alert").alert('close');
});

function performJoin() {
	let input = $("#input-area").val();
	let output = $("#output-area");
	let regexText = $("#regex-area").val();
	let regex = defaultRegex;
	try {
		if (regexText != "") {
			let match = input.match(new RegExp('^/(.*?)/([gimyu]*)$'));
			if (match == null || match.length() != 2) {
				throw new SyntaxError("Malformed regex. Please, use JavaScript regex notation");
			}
			regex = RegExp(match[1], match[2]);
		}
		output.val(input.split("\n").reduce(function(prev, next) { return prev + next.replace(regex, "") }, ""));
	} catch (e) {
		showAlert(e.toString());
		console.log(e);
	}
}

function clearRegex() {
	$("#regex-area").val("");
}

function showAlert(msg) {
	$("#alert-msg").text(msg);
	$(".alert").show();
}

function hideAlert() {
	$(".alert").hide();
}
