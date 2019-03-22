let mouseEventTmpl = $.templates('#mouse-event-template');
let wheelEventTmpl = $.templates('#wheel-event-template');
let touchEventTmpl = $.templates('#touch-event-template');
let pointerEventTmpl = $.templates('#pointer-event-template');

function touchListToArray(tl) {
    let result = [];

    for (let i = 0; i < tl.length; i++) {
        result.push(tl.item(i));
    }

    return result;
}

$.views.helpers({ touchListToArray: touchListToArray });

function genericEventHandler(template, e) {
    let html = template.render(e.originalEvent);
    $('.event-listing').append(html);

    e.preventDefault();
    return true;
}

let mouseEventHandler = (e) => genericEventHandler(mouseEventTmpl, e);
let wheelEventHandler = (e) => genericEventHandler(wheelEventTmpl, e);
let touchEventHandler = (e) => genericEventHandler(touchEventTmpl, e);
let pointerEventHandler = (e) => genericEventHandler(pointerEventTmpl, e);

let eventGroups = {
    'mouse-button': ['auxclick', 'click', 'contextmenu', 'dblclick',
        'mousedown', 'mouseup', 'pointerlockchange', 'pointerlockerror',
        'select'],
    'mouse-move': ['mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover'],
    'touch-events': ['touchstart', 'touchend', 'touchmove', 'touchcancel'],
    'pointer-button': ['pointerdown', 'pointerup', 'pointercancel', 
        'gotpointercapture', 'lostpointercapture'],
    'pointer-move': ['pointerover', 'pointerenter', 'pointermove', 'pointerout',
        'pointerleave']
}

function bindAll(selector, events, on, handler) {
    for (let eventname of events) {
        if (on) {
            $(selector).on(eventname, handler);
        } else {
            $(selector).off(eventname, handler);
        }
    }
}

$('input[name="mouse-button"]').change((e) => {
    let state = e.target.checked;

    bindAll('.input-area', eventGroups['mouse-button'], state, mouseEventHandler);

    if (state) {
        $('.input-area').on('wheel', wheelEventHandler);
    } else {
        $('.input-area').off('wheel', wheelEventHandler);
    }
});

$('input[name="mouse-move"]').change((e) => {
    bindAll('.input-area', eventGroups['mouse-move'], e.target.checked,
        mouseEventHandler);
});

$('input[name="touch-events"]').change((e) => {
    bindAll('.input-area', eventGroups['touch-events'], e.target.checked,
        touchEventHandler);
});

$('input[name="pointer-button"]').change((e) => {
    bindAll('.input-area', eventGroups['pointer-button'], e.target.checked,
        pointerEventHandler);
});

$('input[name="pointer-move"]').change((e) => {
    bindAll('.input-area', eventGroups['pointer-move'], e.target.checked,
        pointerEventHandler);
});