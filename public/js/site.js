function toggleUserMenu() {
    if ($('#userMenu').is(':hidden')) {
        $.get('/cp/usermenu', function (data) {
            $('#userMenu').html(data);
            $('#userMenu').show();
        });
    }
    else $('#userMenu').hide();
}

function selectSite(id) {
    $.get('/cp/usermenu?handler=Select&id=' + id.toString(), function (data) {
        if (window.location.href.indexOf('/cp/host') > -1) window.location.href = '/cp/settings/';
        else window.location.href = '/cp/';
    });
}

function sidebarToggle() {
    if ($('#sidebar').hasClass('d-none')) $('#sidebar').removeClass('d-none').css('margin-top', '10px');
    else $('#sidebar').addClass('d-none').css('margin-top', '');
}