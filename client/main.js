$(document).ready(function() {

    if(localStorage.token) {
        $('#logoutPage').show()
        $('#registerPage').hide()
        $('#updateComic').hide()
        $('#listComic').show()
        $('#loginPage').hide()
    } else {
        $('#logoutPage').hide()
        $('#registerPage').hide()
        $('#updateComic').hide()
        $('#listComic').hide()
        $('#loginPage').show()
    }

    $('#loginBtn').click(function(e) {
        e.preventDefault()
        login()
    })
    $(document).on('click', '#btn-logout', function(e) {
        e.preventDefault()
        logout()
    })
    $(document).on('click', '#editComicBtn', function(e) {
        e.preventDefault()
        
    })
    
})

function login() {
    $.ajax({
        url: 'http://localhost:3000/login',
        type: 'post',
        data: {
            email: $('#emailLogin').val(),
            password: $('#passwordLogin').val()
        },
        success: function(response) {
            console.log('login masuk')
            localStorage.setItem('token', response.token)
            $('#listComic').show()
            $('#loginPage').hide()
            $('#logoutPage').show()
            listComic()
        },
        error: function(error) {
            console.log(error)
            $('#alert').empty()
            $('#alert').append(`
                <p>${error}</p>
            `)
        }
    })
}

function logout() {
    localStorage.removeItem('token')
    $('#loginPage').show()
    $('#logoutPage').hide()
    $('#listComic').hide()
}

function listComic() {
    $.ajax({
        url: 'http://localhost:3000/comics',
        type: 'get',
        success: function(response) {
            $('#listComic').empty()

            response.forEach(element => {
                console.log(element)
                $('#listComic').append(`
                        <div class="row my-4">
                        <!-- Each of comic will have one of this card -->
                        <div class="col-4 mb-4">
                          <div class="card text-center">
                            <img
                              src="${element.imageUrl}"
                              class="card-img-top">
                            <div class="card-body">
                              <h5 class="card-title">${element.title}</h5>
                              <p class="card-text">${element.author}</p>
                              <button class="btn btn-primary" id="editComicBtn(${element.id})">Edit</button>
                            </div>
                          </div>
                        </div>
                      </div>
                `)
            })
              
        },
        error: function(error) {
            console.log(error)
            $('#alert').empty()
            $('#alert').append(`
                <p>${error}</p>
            `)
        }
    })
}