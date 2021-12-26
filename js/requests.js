let editedRequestID

// Обновление списка маршрутов
function getRequests() {
    $('#requests > table > tbody').html('')
    $.ajax(API_LINK + 'request', {
        success: (data) => {
            JSON.parse(data).forEach(item => {
                $('#requests > table > tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.scheme}</td>
                        <td>${item.client}</td>
                        <td>${item.execution_date.slice(0, 10)}</td>
                        <td>${item.execution_time}</td>
                        <td>${item.description}</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                class="bi bi-pencil-fill btn p-0" viewBox="0 0 16 16" id="editRoute${item.id}">
                                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                 class="bi bi-trash-fill btn p-0" viewBox="0 0 16 16" id="removeRoute${item.id}">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </td>
                    </tr>
                `)
            })

            // Удаление данных
            $('#requests .bi-trash-fill').click((e) => {
                if (confirm('Вы точно хотите удалить эту запись?')) {
                    let id = $(e.currentTarget).attr('id').slice(11)
                    $.ajax(API_LINK + 'request?id=' + id, {
                        type: 'DELETE',
                        success: () => {
                            getRequests()
                        }
                    })
                }
            })

            // Редактирование записи
            $('#requests .bi-pencil-fill').click((e) => {
                $('#requests .modal-btn-save').removeClass('d-none')
                $('#requests .modal-btn-add').addClass('d-none')
                editedRequestID = $(e.currentTarget).parent().parent().children()[0].innerHTML
                $('#requestsScheme').html('')
                $('#requestsClient').html('')
                $('#requestsDate').val('')
                $('#requestsTime').val('')
                $('#requestsDesc').val('')

                // Получаем список схем
                $.ajax(API_LINK + 'scheme', {
                    success: (data) => {
                        JSON.parse(data).forEach(item => {
                            $('#requestsScheme').append(`<option value="${item.id}">${item.id} - ${item.vehicle_type.name} - ${item.transportation_type.name}</option>`)
                        })
                        $('#requestsScheme').val($(e.currentTarget).parent().parent().children(':nth-child(2)').html())
                    },
                    error: () => {
                        alert('Ошибка подключения к серверу')
                    }
                })

                // Получаем список схем
                $.ajax(API_LINK + 'client', {
                    success: (data) => {
                        JSON.parse(data).forEach(item => {
                            $('#requestsClient').append(`<option value="${item.id}">${item.id} - ${item.surname} ${item.name.slice(0, 1)}. ${item.patronymic.slice(0, 1)}.</option>`)
                        })
                        $('#requestsClient').val($(e.currentTarget).parent().parent().children(':nth-child(3)').html())
                    },
                    error: () => {
                        alert('Ошибка подключения к серверу')
                    }
                })

                $('#requestsDate').val($(e.currentTarget).parent().parent().children(':nth-child(4)').html())
                $('#requestsTime').val($(e.currentTarget).parent().parent().children(':nth-child(5)').html())
                $('#requestsDesc').val($(e.currentTarget).parent().parent().children(':nth-child(6)').html())

                $('#requests .modal').modal('show')
            })
        },
        error: () => {
            alert('Произошла ошибка подключения к удаленному серверу')
        }
    })
}

// Добавление данных
// Сокрытие и показ нужных кнопкой
$('#requests .bi-plus-lg').click(() => {
    $('#requests .modal-btn-save').addClass('d-none')
    $('#requests .modal-btn-add').removeClass('d-none')
    $('#requestsScheme').html('')
    $('#requestsClient').html('')
    $('#requestsDate').val('')
    $('#requestsTime').val('')
    $('#requestsDesc').val('')

    // Получаем список схем
    $.ajax(API_LINK + 'scheme', {
        success: (data) => {
            JSON.parse(data).forEach(item => {
                $('#requestsScheme').append(`<option value="${item.id}">${item.id} - ${item.vehicle_type.name} - ${item.transportation_type.name}</option>`)
            })
            $('#requestsScheme').val(0)
        },
        error: () => {
            alert('Ошибка подключения к серверу')
        }
    })

    // Получаем список схем
    $.ajax(API_LINK + 'client', {
        success: (data) => {
            JSON.parse(data).forEach(item => {
                $('#requestsClient').append(`<option value="${item.id}">${item.id} - ${item.surname} ${item.name.slice(0, 1)}. ${item.patronymic.slice(0, 1)}.</option>`)
            })
            $('#requestsClient').val(0)
        },
        error: () => {
            alert('Ошибка подключения к серверу')
        }
    })
})

// Отправка запроса на создание записи
$('#requests .modal-btn-add').click(() => {
    $.ajax(API_LINK + 'request', {
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            scheme: $('#requestsScheme').val(),
            client: $('#requestsClient').val(),
            execution_date: $('#requestsDate').val(),
            execution_time: $('#requestsTime').val(),
            description: $('#requestsDesc').val()
        },
        success: () => {
            getRequests()
            $('#requests .modal').modal('hide')
        },
        error: () => {
            alert('Произола ошибка. Проверте правильность введенных данных')
        }
    })
})

// Сохранение записи
$('#requests .modal-btn-save').click(() => {
    console.log({
        id: editedRequestID,
        scheme: $('#requestsScheme').val(),
        client: $('#requestsClient').val(),
        execution_date: $('#requestsDate').val(),
        execution_time: $('#requestsTime').val(),
        description: $('#requestsDesc').val()
    })
    $.ajax(API_LINK + 'request', {
        type: 'PUT',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: editedRequestID,
            scheme: $('#requestsScheme').val(),
            client: $('#requestsClient').val(),
            execution_date: $('#requestsDate').val(),
            execution_time: $('#requestsTime').val(),
            description: $('#requestsDesc').val()
        },
        success: () => {
            $('#requests .modal').modal('hide')
            getRequests()
        },
        error: () => {
            alert('Произола ошибка. Проверте правильность введенных данных')
        }
    })
})