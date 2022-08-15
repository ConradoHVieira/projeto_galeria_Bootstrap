import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByTelescope(telescope) {
    $('[wm-telescope]').each(function (i, e) {
        const isTarget = $(this).attr('wm-telescope') === telescope
            || telescope === null
        if (isTarget) {
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.telescopeButtons = function () {
    const telescopes = new Set
    $('[wm-telescope]').each(function (i, e) {
        telescopes.add($(e).attr('wm-telescope'))
    })

    const btns = Array.from(telescopes).map(telescope => {
        const btn = $('<button>')
            .addClass(['btn', 'btn-info']).html(telescope)
        btn.click(e => filterByTelescope(telescope))
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-info']).html('Todas')
    btnAll.click(e => filterByTelescope(null))
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-telescope-buttons]').telescopeButtons()
})