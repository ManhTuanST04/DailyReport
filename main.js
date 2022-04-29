function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

function isEmptyString(str) {
    return !str || str.length === 0;
}

function onClickSubmit() {
    console.log('vao day');
    let dateReport = $('#dateReport').val().trim();
    let todayTask = $('#todayTask').val().trim();
    let riskIssues = $('#riskIssues').val().trim();
    let tomorrowTask = $('#tomorrowTask').val().trim();

    // validate
    if (isEmptyString(todayTask)) {
        $('#todayTask').focus();
        return;
    }
    if (isEmptyString(riskIssues)) {
        $('#riskIssues').focus();
        return;
    }
    if (isEmptyString(tomorrowTask)) {
        $('#tomorrowTask').focus();
        return;
    }

    let contentReport = `
Daily report ${dateReport}
1/ Tasks hôm nay:
${todayTask}
2/ Risks/Issues:
${riskIssues}
3/ Tasks hôm sau:
${tomorrowTask}
`;

    $('#contentReport').val(contentReport.trim());

    $('#exampleModal').modal('show');

    downloadReport(contentReport.trim(), generateFileName(), 'text/plain');
}

function generateFileName() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    let dateTime = [year, month, day].join('_');

    return `DaylyReport_${dateTime}.txt`;
}

function onClickCopyContent() {
    let contentReport = $('#contentReport').val();

    if (contentReport) {
        navigator.clipboard.writeText(contentReport);
        toastr.success('Đã sao chép nội dung report vào clipboard');
    } else {
        toastr.error('Vui lòng tạo report trước khi sao chép');
    }
}

function downloadReport(text, name, type) {
    var a = document.getElementById('downloadFile');
    var file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
}

function resetReport() {
    $('#contentReport').val('');
}
