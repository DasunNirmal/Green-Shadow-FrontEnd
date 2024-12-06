 var recordIndexEquipment;

function getCookies(cookieName) {
     let name = cookieName + "=";
     let decodedCookie = decodeURIComponent(document.cookie);
     let ca = decodedCookie.split(';');
     for (let i = 0; i < ca.length; i++) {
         let c = ca[i];
         while (c.charAt(0) == ' ') {
             c = c.substring(1);
         }
         if (c.indexOf(name) == 0) {
             return c.substring(name.length, c.length);
         }
     }
     return "";
}


    function clearFields() {
        $('#txtMemberID-equipment').val("");
        $('#txtFirstName-equipment').val("");
        $('#txtRole-equipment').val("");
        $('#txtPhoneNumber-equipment').val("");
        $('#txtFieldCode').val("");
        $('#txtFieldName-equipment').val("");
        $('#txtFieldLocation-equipment').val("");
        $('#txtSearchEmployees').val("")
        $('#txtSearchFields-equipment').val("")
        $('#txtEquipmentCode').val("");
        $('#txtEquipmentName').val("");
        $('#txtType').val("");
        $('#txtEquipmentStatus').val("");
        $('#txtSearch-equipment').val("");
    }

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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
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

    export function loadEquipmentTable() {
        $("#equipment-table-tb").empty();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/equipment',
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: function(res) {
                console.log(res);
                if (Array.isArray(res)) {
                    res.forEach(function(equipment) {
                        var staff_id = equipment.staff_id == null ? "Not Available" : equipment.staff_id;
                        var field_code = equipment.field_code == null ? "Not Available" : equipment.field_code;
                        var vehicleRecord = `
                        <tr>
                            <td class="e-eq_code">${equipment.eq_code}</td>
                            <td class="e-name">${equipment.name}</td>
                            <td class="e-type">${equipment.type}</td>
                            <td class="e-status">${equipment.status}</td>
                            <td class="e-staff_id">${staff_id}</td>
                            <td class="e-first_name">${equipment.first_name}</td>
                            <td class="e-role">${equipment.role}</td>
                            <td class="e-phone_no">${equipment.phone_no}</td>
                            <td class="e-field_code">${field_code}</td>
                            <td class="e-field_name">${equipment.field_name}</td>
                            <td class="e-field_location">${equipment.field_location}</td>
                        </tr>`;
                        $('#equipment-table-tb').append(vehicleRecord);
                    });
                    let count = 0;
                    for (let i = 0; i < res.length; i++) {
                        if (res[i] != null) {
                            count++;
                        }
                    }
                } else {
                    console.log('No equipment data found or incorrect response format.');
                }
            },
            error: function(res) {
                console.error('Error loading equipment data:', res);
            }
        });
    }

    $('#equipment-table-tb').on('click','tr',function () {
        recordIndexEquipment = $(this).index();

        var eq_code = $(this).find(".e-eq_code").text();
        var name = $(this).find(".e-name").text();
        var type = $(this).find(".e-type").text();
        var status = $(this).find(".e-status").text();
        var staff_id = $(this).find(".e-staff_id").text();
        var first_name = $(this).find(".e-first_name").text();
        var role = $(this).find(".e-role").text();
        var phone_no = $(this).find(".e-phone_no").text();
        var field_code = $(this).find(".e-field_code").text();
        var field_name = $(this).find(".e-field_name").text();
        var field_location = $(this).find(".e-field_location").text();

        var isAvailable = status === "Available";

        $('#txtMemberID-equipment').prop('disabled', !isAvailable).val(staff_id);
        $('#txtFirstName-equipment').prop('disabled', !isAvailable).val(first_name);
        $('#txtRole-equipment').prop('disabled', !isAvailable).val(role);
        $('#txtPhoneNumber-equipment').prop('disabled', !isAvailable).val(phone_no);
        $('#txtFieldCode').prop('disabled', !isAvailable).val(field_code);
        $('#txtFieldName-equipment').prop('disabled', !isAvailable).val(field_name);
        $('#txtFieldLocation-equipment').prop('disabled', !isAvailable).val(field_location);
        $('#btnSearchFields-equipment').prop('disabled', !isAvailable);
        $('#btnSearchEmployees').prop('disabled', !isAvailable);
        $('#txtSearchEmployees').prop('disabled', !isAvailable);
        $('#txtSearchFields-equipment').prop('disabled', !isAvailable);
        $('#txtEquipmentCode').val(eq_code);
        $('#txtEquipmentName').val(name);
        $('#txtType').val(type);
        $('#txtEquipmentStatus').val(status);
    });

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
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            contentType: 'application/json',
            success: (response) => {
                console.log(JSON.stringify(response));
                console.log('Equipment saved successfully:', response);
                loadEquipmentTable();
            },
            error: (error) => {
                console.error('Error saving equipment:', error);
            }
        });
    });

    $('#update-equipment').on('click', () => {
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
            url: 'http://localhost:8081/greenShadow/api/v1/equipment/' + eq_code,
            type: 'PATCH',
            data: equipmentJson,
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (response) => {
                console.log(JSON.stringify(response));
                console.log('Equipment updated successfully:', response);
                loadEquipmentTable();
            },
            error: (error) => {
                console.error('Error updating equipment:', error);
            }
        });
    });

    $('#delete-equipment').on('click',() => {
        var eq_code = $('#txtEquipmentCode').val();
        var name = $('#txtEquipmentName').val();
        var type = $('#txtType').val();
        var status = $('#txtEquipmentStatus').val();
        var staff_id = $('#txtMemberID-equipment').val();
        var first_name = $('#txtFirstName-equipment').val();
        var role = $('#txtRole-equipment').val();
        var phone_no = $('#txtPhoneNumber-equipment').val();
        var field_code = $('#txtFieldCode').val();
        var field_name = $('#txtFieldName-equipment').val();
        var field_location = $('#txtFieldLocation-equipment').val();

        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/equipment/' + eq_code,
            type: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (res) => {
                console.log(JSON.stringify(res));
                console.log("Equipment Deleted");
                loadEquipmentTable();
            },
            error: (res) => {
                console.error(res);
                console.log("Equipment Not Deleted");
            }
        });
    });

    $('#search-equipment').on('click', function() {
        const searchQuery = $('#txtSearch-equipment').val();
        searchEquipmentByID(searchQuery);
    });

    function searchEquipmentByID(query) {
        const eq_code = query.toLowerCase();
        $.ajax({
            url: 'http://localhost:8081/greenShadow/api/v1/equipment?eq_code=' + eq_code,
            type: 'GET',
            dataType: 'json',
            headers: {
                'Authorization': `Bearer ${getCookies("token")}`,
            },
            success: (response) => {
                console.log('Full response:', response);
                for (let i = 0; i < response.length; i++) {
                    if (eq_code === response[i].eq_code) {
                        var equipment = response[i];
                        break;
                    }
                }
                if (equipment) {
                    var isAvailable = equipment.status === "Available";
                    var staff_id = equipment.staff_id == null ? "Not Available" : equipment.staff_id;
                    var field_code = equipment.field_code == null ? "Not Available" : equipment.field_code;
                    $('#txtMemberID-equipment').prop('disabled', !isAvailable).val(staff_id);
                    $('#txtFirstName-equipment').prop('disabled', !isAvailable).val(equipment.first_name);
                    $('#txtRole-equipment').prop('disabled', !isAvailable).val(equipment.role);
                    $('#txtPhoneNumber-equipment').prop('disabled', !isAvailable).val(equipment.phone_no);
                    $('#txtFieldCode').prop('disabled', !isAvailable).val(field_code);
                    $('#txtFieldName-equipment').prop('disabled', !isAvailable).val(equipment.field_name);
                    $('#txtFieldLocation-equipment').prop('disabled', !isAvailable).val(equipment.field_location);
                    $('#btnSearchFields-equipment').prop('disabled', !isAvailable);
                    $('#btnSearchEmployees').prop('disabled', !isAvailable);
                    $('#txtSearchEmployees').prop('disabled', !isAvailable);
                    $('#txtSearchFields-equipment').prop('disabled', !isAvailable);
                    $('#txtEquipmentCode').val(equipment.eq_code);
                    $('#txtEquipmentName').val(equipment.name);
                    $('#txtType').val(equipment.type);
                    $('#txtEquipmentStatus').val(equipment.status);
                    $('#txtSearch-vehicles').val("");
                } else {
                    console.error('Equipment not found');
                }
            },
            error: function(error) {
                console.error('Error searching equipment:', error);
                loadEquipmentTable();
            }
        });
    }

    $('#clear-equipment').on('click', () => {
        clearFields();
    });