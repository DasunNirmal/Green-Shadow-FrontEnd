$(document).ready(function () {
    $('#txtStatus').on('click',  () => {
        var status = $('#txtStatus').val();
        var isAvailable = status === "Available";

        var role = $('#txtVehicleRole');
        var first_name = $('#txtVehicleFirstName');
        var phone_no = $('#txtVehiclePhoneNumber');
        var email = $('#txtVehicleEmail');
        var staff_id = $('#txtVehicleMemberID');
        var search = $('#txtSearchEmploys');
        var btn = $('#btnSearchEmploys');

        role.prop('disabled', !isAvailable);
        first_name.prop('disabled', !isAvailable);
        phone_no.prop('disabled', !isAvailable);
        email.prop('disabled', !isAvailable);
        staff_id.prop('disabled', !isAvailable);
        search.prop('disabled', !isAvailable);
        btn.prop('disabled', !isAvailable);
    });
});