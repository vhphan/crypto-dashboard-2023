import {Notify} from "quasar";

Notify.setDefaults({
    timeout: 2500,
    actions: [{ icon: 'close', color: 'white' }]
})

export const triggerPositive = function (opts = {}) {
    Notify.create({
        ...{
            type: 'positive',
            message: 'This is a "positive" type notification.'
        }, ...opts
    })
}

export const triggerNegative = function (opts = {}) {
    Notify.create({
        ...{
            type: 'negative',
            message: 'This is a "negative" type notification.',
            position: 'center'
        }, ...opts
    });
}

export const triggerWarning = function (opts = {}) {
    Notify.create({
        ...{
            type: 'warning',
            message: 'This is a "warning" type notification.'
        },
        ...opts
    })
}

export const triggerInfo = function (opts = {}) {
    Notify.create({
        ...{
            type: 'info',
            message: 'This is a "info" type notification.',
            position: 'center'
        }, ...opts
    })
}

export const triggerOngoing = function () {
    // we need to get the notification reference
    // otherwise it will never get dismissed ('ongoing' type has timeout 0)
    const notif = Notify.create({
        type: 'ongoing',
        message: 'Looking up the search terms...'
    })

    // simulate delay
    setTimeout(() => {
        notif({
            type: 'positive',
            message: 'Found the results that you were looking for',
            timeout: 1000
        })
    }, 4000)
}

export const useMyNotify = () => {
    return {
        triggerOngoing,
        triggerInfo,
        triggerWarning,
        triggerNegative,
        triggerPositive,
    }
}