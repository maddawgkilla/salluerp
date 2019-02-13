$(document).ready(function() {
    console.log("JQuery Loaded");
    $("#orderType").on("change", function() {
        // Pure JS
        var selectedVal = this.value;

        if (selectedVal == 'wholesale') {
            $("#discountDiv").removeClass('hide');
            $("#creditDiv").removeClass('hide');
            $("#buyerDiv").removeClass('hide');
            console.log("In this");
            $("#buyer").prop("required", true);
            $("#credit").prop("required", true);
        } else {
            $("#discountDiv").addClass('hide');
            $("#creditDiv").addClass('hide');
            $("#buyerDiv").addClass('hide');
            console.log("In that");
            $("#buyer").prop("required", false);
            $("#credit").prop("required", false);
        }
    });

    $("#weight").on('change', function() {
        const weight =  this.value;
        // console.log(weight);
        const cpkg = document.querySelector('#costPerKg').value;
        let cost = weight * cpkg;
        // console.log(cost);
        cost = Math.round(cost * 100) / 100;
        document.querySelector('#cost').value = cost;
    });
});