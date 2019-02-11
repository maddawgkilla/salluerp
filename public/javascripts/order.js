$(document).ready(function() {
    console.log("JQuery Loaded");
    $("#orderType").on("change", function() {
        // Pure JS
        var selectedVal = this.value;

        if (selectedVal == 'Wholesale') {
            $("#discountDiv").toggleClass('hide');
            $("#creditDiv").toggleClass('hide');
            $("#buyerDiv").toggleClass('hide');
        } else {
            $("#discountDiv").toggleClass('hide');
            $("#creditDiv").toggleClass('hide');
            $("#buyerDiv").toggleClass('hide');
        }
    });
});