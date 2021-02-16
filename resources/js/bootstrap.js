window._ = require('lodash')

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = process.env.MIX_APP_URL + '/api/'

if (process.env.MIX_APP_ENV === 'production' && 'serviceWorker' in navigator) {
    let timeoutOne, timeoutTwo

    require('devtools-detect')

    window.addEventListener('devtoolschange', e => {
        if (e.detail.isOpen) {
            console.log('%cHOOOOOOOLD UP!', 'font-size:6rem;font-weight:bold;color:#e3342f')
            console.log('%cWhat are you %cbuying%c doing?', 'font-size: 2rem', 'font-size: 2rem;text-decoration:line-through', 'font-size: 2rem;text-decoration:none')
            console.log('%cNothing interesting here.. Just close this and pretend to see nothing :)', 'font-size: 2rem')
            timeoutOne = setTimeout(() => {
                console.log('%cStill not close this thing? well just wait for a second there something interesting will appear', 'font-size: 2rem')
                timeoutTwo = setTimeout(() => {
                    console.log(`       ,
       \\\`-._           __
        \\\\  \`-..____,.'  \`.
         :\`.         /    \\\`.
         :  )       :      : \\
          ;'        '   ;  |  :
          )..      .. .:.\`.;  :
         /::...  .:::...   \` ;
         ; _ '    __        /:\\
         \`:o>   /\\o_>      ;:. \`.
        \`-\`.__ ;   __..--- /:.   \\
        === \\_/   ;=====_.':.     ;
         ,/'\`--'...\`--....        ;
              ;                    ;
            .'                      ;
          .'                        ;
        .'     ..     ,      .       ;
       :       ::..  /      ;::.     |
      /      \`.;::.  |       ;:..    ;
     :         |:.   :       ;:.    ;
     :         ::     ;:..   |.    ;
      :       :;      :::....|     |
      /\\     ,/ \\      ;:::::;     ;
    .:. \\:..|    :     ; '.--|     ;
   ::.  :''  \`-.,,;     ;'   ;     ;
.-'. _.'\\      / \`;      \\,__:      \\
\`---'    \`----'   ;      /    \\,.,,,/
                   \`----\``)
                }, 10000)
            }, 10000)
        }

        if (!e.detail.orientation) {
            clearTimeout(timeoutOne)
            clearTimeout(timeoutTwo)
        }
    })

    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/service-worker.js')
    })
}
