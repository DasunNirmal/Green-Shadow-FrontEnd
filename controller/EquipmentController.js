$(document).ready(function(){


    $('#btnSearchEmployees').on('click', function() {
        const searchQuery = $('#txtSearchEmployees').val();
        searchStaffByID(searchQuery);
    });

    function searchStaffByID(query) {
        const staff_id = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/staff?staff_id=' + staff_id,
            type: 'GET',
            dataType: 'json',
            success: (staffResponse) => {
                console.log('staff data:', staffResponse);
                for (let i = 0; i < staffResponse.length; i++) {
                    if (staff_id === staffResponse[i].staff_id) {
                        var staff = staffResponse[i];
                        break;
                    }
                }

                if (staff) {
                    console.log('Staff retrieved successfully:', staff);
                    $('#txtMemberID-equipment').val(staff.staff_id);
                    $('#txtFirstName-equipment').val(staff.first_name);
                    $('#txtRole-equipment').val(staff.role);
                    $('#txtPhoneNumber-equipment').val(staff.phone_no);
                    $('#txtSearchEmployees').val("");
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }

    $('#btnSearchFields-equipment').on('click', function() {
        const searchQuery = $('#txtSearchFields-equipment').val();
        searchFieldsByID(searchQuery);
    });

    function searchFieldsByID(query) {
        const field_code = query.toLowerCase();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/field?field_code=' + field_code,
            type: 'GET',
            dataType: 'json',
            success: (response) => {
                console.log('Full response:', response);
                for (let i = 0; i < response.length; i++) {
                    if (field_code === response[i].field_code) {
                        var field = response[i];
                        break;
                    }
                }

                if (field) {
                    console.log('Field retrieved successfully:', field);
                    $('#txtFieldCode').val(field.field_code);
                    $('#txtFieldName-equipment').val(field.field_name);
                    $('#txtFieldLocation-equipment').val(field.field_location);
                    $('#txtSearchFields-equipment').val("");
                } else {
                    console.error('Field not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }
    $('#save-equipment').on('click', () => {
        var eq_code = $('#txtEquipmentCode').val();
        var name = $('#txtEquipmentName').val();
        var type = $('#txtType').val();
        var status = $('#txtEquipmentStatus').val();

        var isAvailable = status === "Available";
        var staff_id = isAvailable ? $('#txtMemberID-equipment').val() : null;
        var first_name = isAvailable ? $('#txtFirstName-equipment').val() : "*--*";
        var role = isAvailable ? $('#txtRole-equipment').val() : "*--*";
        var phone_no = isAvailable ? $('#txtPhoneNumber-equipment').val() : "*--*";
        var field_code = isAvailable ? $('#txtFieldCode').val() : null;
        var field_name = isAvailable ? $('#txtFieldName-equipment').val() : "*--*";
        var field_location = isAvailable ? $('#txtFieldLocation-equipment').val() : "*--*";

        const equipmentData = {
            eq_code:eq_code,
            name:name,
            type:type,
            status:status,
            first_name:first_name,
            role:role,
            phone_no:phone_no,
            field_name:field_name,
            field_location:field_location,
            staff_id: staff_id,
            field_code: field_code
        }

        const equipmentJson = JSON.stringify(equipmentData);
        console.log(equipmentJson);

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/equipment',
            type: 'POST',
            data: equipmentJson,
            contentType: 'application/json',
            success: (response) => {
                console.log(JSON.stringify(response));
                console.log('Equipment saved successfully:', response);
            },
            error: (error) => {
                console.error('Error saving equipment:', error);
            }
        });
    });
});