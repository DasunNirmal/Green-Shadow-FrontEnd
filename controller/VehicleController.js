$(document).ready(function(){


    $('#btnSearchEmploys').on('click', function() {
        const searchQuery = $('#txtSearchEmploys').val();
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
                    $('#txtVehicleMemberID').val(staff.staff_id);
                    $('#txtVehicleFirstName').val(staff.first_name);
                    $('#txtVehicleEmail').val(staff.email);
                    $('#txtVehicleRole').val(staff.role);
                    $('#txtVehiclePhoneNumber').val(staff.phone_no);
                } else {
                    console.error('Staff not found');
                }
            },
            error: function(error) {
                console.error('Error searching field:', error);
            }
        });
    }
});