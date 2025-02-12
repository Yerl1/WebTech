$(document).ready(function () {
    function updatePrices() {
        let ageGroup = $("#age-group").val();
        let discount = 0;

        if (ageGroup === "senior") {
            discount = 0.5; 
        } else if (ageGroup === "under18") {
            discount = 0.3; 
        }

        $(".price").each(function () {
            let basePrice = parseFloat($(this).attr("data-base-price"));
            let finalPrice = basePrice * (1 - discount);
            $(this).find(".price-value").text(`$${finalPrice.toFixed(2)}`);
        });
    }

    $("#age-group").on("change", updatePrices);
    updatePrices(); 
});
