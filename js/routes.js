let editedTransportationID

// Обновление списка маршрутов
function getTransportations() {
    $('#transportations > table > tbody').html('')
    $.ajax(API_LINK + 'transportation', {
        success: (data) => {
            JSON.parse(data).forEach(item => {
                $('#transportations > table > tbody').append(`
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
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
            $('#transportations .bi-trash-fill').click((e) => {
                if (confirm('Вы точно хотите удалить эту запись?')) {
                    let id = $(e.currentTarget).attr('id').slice(11)
                    $.ajax(API_LINK + 'transportation?id=' + id, {
                        type: 'DELETE',
                        success: () => {
                            getTransportations()
                        }
                    })
                }
            })

            // Редактирование записи
            $('#transportations .bi-pencil-fill').click((e) => {
                $('#transportations .modal-btn-save').removeClass('d-none')
                $('#transportations .modal-btn-add').addClass('d-none')
                editedTransportationID = $(e.currentTarget).parent().parent().children()[0].innerHTML
                $('#transportationName').val($(e.currentTarget).parent().parent().children()[1].innerHTML)
                $('#transportations .modal').modal('show')
            })
        },
        error: () => {
            alert('Произошла ошибка подключения к удаленному серверу')
        }
    })
}

// Добавление данных
// Сокрытие и показ нужных кнопкой
$('#transportations .bi-plus-lg').click(() => {
    $('#transportations .modal-btn-save').addClass('d-none')
    $('#transportations .modal-btn-add').removeClass('d-none')
    $('#transportationName').val('')
})

// Отправка запроса на создание записи
$('#transportations .modal-btn-add').click(() => {
    $.ajax(API_LINK + 'transportation', {
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            name: $('#transportationName').val()
        },
        success: () => {
            getTransportations()
            $('#transportations .modal').modal('hide')
        },
        error: () => {
            alert('Произола ошибка. Проверте правильность введенных данных')
        }
    })
})

// Сохранение записи
$('#transportations .modal-btn-save').click(() => {
    $.ajax(API_LINK + 'transportation', {
        type: 'PUT',
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: editedTransportationID,
            name: $('#transportationName').val()
        },
        success: () => {
            $('#transportations .modal').modal('hide')
            getTransportations()
        },
        error: () => {
            alert('Произола ошибка. Проверте правильность введенных данных')
        }
    })
})