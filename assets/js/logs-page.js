$(document).ready(function () {
    $('#field-log-button').on('click', () => {
        const field = $('#field-log-section');
        const crop = $('#crop-log-section');
        const staff = $('#staff-log-section');
        field.show();
        crop.hide();
        staff.hide();
    });
    $('#crop-log-button').on('click', () => {
        const field = $('#field-log-section');
        const crop = $('#crop-log-section');
        const staff = $('#staff-log-section');
        crop.show();
        staff.hide();
        field.hide();
    });
    $('#staff-log-button').on('click', () => {
        const field = $('#field-log-section');
        const crop = $('#crop-log-section');
        const staff = $('#staff-log-section');
        staff.show();
        crop.hide();
        field.hide();
    });
});