const defaultRegex = /^(.*[vdiwea]\/((.|\s)*?): )/i;
$(document).ready(() => {
    $('#regex-area').attr('placeholder', `Default: ${defaultRegex}`);
    $('#btn-join').on('click', performJoin);
    $('#btn-clear-regex').on('click', clearRegex);
    $('#btn-close-alert').on('click', hideAlert);
});

function performJoin() {
    const input = $('#input-area').val();
    const output = $('#output-area');
    const regexText = $('#regex-area').val();
    let regex = defaultRegex;
    try {
        if (regexText !== '') {
            const match = regexText.match(/^\/(.*?)\/([gimyu]*)$/);
            if (match == null || match.length !== 3) {
                throw new SyntaxError('Malformed regex. Please, use JavaScript regex notation');
            }
            regex = RegExp(match[1], match[2]);
        }
        output.val(input.split('\n').reduce((prev, next) => prev + next.replace(regex, ''), ''));
    } catch (e) {
        showAlert(e.toString());
    }
}

function clearRegex() {
    $('#regex-area').val('');
}

function showAlert(msg) {
    $('#alert-msg').text(msg);
    $('.alert').show();
}

function hideAlert() {
    $('.alert').hide();
}
