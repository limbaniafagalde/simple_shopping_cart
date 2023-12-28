var calculateProductSubtotal = function(element){
    var productPrice = parseFloat($(element).children(".price").text());
    var productQuantity = parseFloat($(element).find('.quantity input').val());

    var productSubtotal = productPrice * productQuantity;

    $(element).children('.subtotal').html("$" + productSubtotal);

    return productSubtotal;
}

var sum = function (acc, x) { return acc + x; };

var calculateTotalPrice = function(){
    var subtotals = [];

    $("tbody tr").each(function(index, element){
        var subtotal = calculateProductSubtotal(element);
        subtotals.push(subtotal);
    });

    console.log(subtotals);

    var totalPrice = subtotals.reduce(sum);

    $('#totalPrice').html(totalPrice);

}

$(document).ready(function() {
    calculateTotalPrice();

    $(document).on('click', '.btn.cancel', function (event) {
        $(this).closest('tr').remove();
        calculateTotalPrice();
    });

    $(document).on('click', '.btn.calculate', function (event) {
        calculateTotalPrice();
    });

    var timeout;

    $(document).on('input', 'tr input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            calculateTotalPrice();
        }, 1000);
    });


    $('#addProduct').on('submit', function (event) {
        event.preventDefault();

        var name = $(this).children('[name=name]').val();
        var price = $(this).children('[name=price]').val();

        $('tbody').append('<tr>' +
        '<td class="name">' + name + '</td>' +
        '<td class="price">' + price + '</td>' +
        '<td class="quantity"><input type="number" value="1"></td>' + 
        '<td><button class="btn btn-light btn-sm cancel">Cancel</button></td>' +
        '<td class="subtotal"></td>' +
        '</tr>');
                
        calculateTotalPrice();
        $(this).children('[name=name]').val('');
        $(this).children('[name=price]').val('');
    });


});