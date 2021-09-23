$('document').ready(function(){
    //Navbar
    $(".navbar-burger").click(function(){
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });
    
    //Products
    var products, displayData;
    var listOfProducts = $('#list-products');
    
    function listProducts(info){
            listOfProducts.loadTemplate('product-list.html', info);
    }

    //Read data
    $.ajax({
        url: './products.json',
    }).done(function(data){
        products = displayData = data;
        listProducts(displayData);
    });

    //Search 
    $('#search').keyup(function(){
        var searchText = $(this).val();
        displayData = _.filter(products, function(item){
            return(
                item.name.toLowerCase().match(searchText.toLowerCase()) ||
                item.description.toLowerCase().match(searchText.toLowerCase()) 
            )
        });
        listProducts(displayData);
    });

    //Checkbox
        $('#filter-options :checkbox').click(function(){
            $("#product-item div").hide();
            $("#filter-options :checkbox:checked").each(function() 
            {
                $("." + $(this).val()).fadeIn();
            });
            if($('#filter-options :checkbox').filter(':checked').length < 1) 
            {
              $("#product-item div").fadeIn();
            }
        });



});