$(document).ready(function () {
    $('#txtEquipmentStatus').on('click',  () => {
        var status = $('#txtEquipmentStatus').val();
        var isAvailable = status === "Available";

        var staff_id = $('#txtMemberID-equipment');
        var first_name = $('#txtFirstName-equipment');
        var role = $('#txtRole-equipment');
        var phone_no = $('#txtPhoneNumber-equipment');
        var field_code = $('#txtFieldCode');
        var field_name = $('#txtFieldName-equipment');
        var field_location = $('#txtFieldLocation-equipment');
        var search_employees = $('#txtSearchEmployees');
        var search_fields = $('#txtSearchFields-equipment');
        var emp_btn = $('#btnSearchEmployees');
        var field_btn = $('#btnSearchFields-equipment');

        staff_id.prop('disabled', !isAvailable);
        first_name.prop('disabled', !isAvailable);
        role.prop('disabled', !isAvailable);
        phone_no.prop('disabled', !isAvailable);
        field_code.prop('disabled', !isAvailable);
        field_name.prop('disabled', !isAvailable);
        field_location.prop('disabled', !isAvailable);
        search_employees.prop('disabled', !isAvailable);
        search_fields.prop('disabled', !isAvailable);
        emp_btn.prop('disabled', !isAvailable);
        field_btn.prop('disabled', !isAvailable);
    });
});