$(document).ready(function () {
    $('#home').on('click',  () => {
        $('#dashboard-section').show();
        $('#field-section').hide();
        $('#crop-section').hide();
        $('#staff-section').hide();
        $('#vehicle-section').hide();
        $('#equipment-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#field').on('click',  () => {
        $('#field-section').show();
        $('#dashboard-section').hide();
        $('#crop-section').hide();
        $('#staff-section').hide();
        $('#vehicle-section').hide();
        $('#equipment-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#crop').on('click',  () => {
        $('#crop-section').show();
        $('#field-section').hide();
        $('#dashboard-section').hide();
        $('#staff-section').hide();
        $('#vehicle-section').hide();
        $('#equipment-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#staff').on('click',  () => {
        $('#staff-section').show();
        $('#crop-section').hide();
        $('#field-section').hide();
        $('#dashboard-section').hide();
        $('#vehicle-section').hide();
        $('#equipment-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#vehicle').on('click',  () => {
        $('#vehicle-section').show();
        $('#staff-section').hide();
        $('#crop-section').hide();
        $('#field-section').hide();
        $('#dashboard-section').hide();
        $('#equipment-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#equipment').on('click',  () => {
        $('#equipment-section').show();
        $('#vehicle-section').hide();
        $('#staff-section').hide();
        $('#crop-section').hide();
        $('#field-section').hide();
        $('#dashboard-section').hide();
        $('#logs-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
    $('#logs').on('click',  () => {
        $('#logs-section').show();
        $('#equipment-section').hide();
        $('#vehicle-section').hide();
        $('#staff-section').hide();
        $('#crop-section').hide();
        $('#field-section').hide();
        $('#dashboard-section').hide();
        $('#registration-section').hide();
        $('#login-section').hide();
    });
});