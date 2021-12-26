// Переключение вкладок
$('.nav-link').click((e) => {
    $('.nav-link').removeClass('bg-white')
    $('.nav-link').addClass('text-white')

    $(e.currentTarget).removeClass('text-white')
    $(e.currentTarget).addClass('bg-white')

    $('#windows > div').addClass('d-none')

    switch ($(e.currentTarget).attr('id')) {
        case 'nav-routes':
            getRoutes()
            $('#routes').removeClass('d-none')
            break
        case 'nav-transport':
            getTransportations()
            $('#transportations').removeClass('d-none')
            break
        case 'nav-vehicle':
            getVehicles()
            $('#vehicles').removeClass('d-none')
            break
        case 'nav-schemes':
            getSchemes()
            $('#schemes').removeClass('d-none')
            break
        case 'nav-clients':
            getClients()
            $('#clients').removeClass('d-none')
            break
        case 'nav-requests':
            getRequests()
            $('#requests').removeClass('d-none')
            break
    }
})