/**
 * 看板娘（Live2D）初始化
 * 运行时：l2d-widget（MIT）https://github.com/hacxy/l2d-widget
 * 模型：terisa（德丽莎，Cubism 2）、Hijiki（小黑猫，Cubism 2），版权归原作者，仅供个人站点非商业使用
 */
(function () {
  if (window.__l2dBooted) return
  window.__l2dBooted = true

  var isMobile = window.matchMedia('(max-width: 768px)').matches

  var commonTips = {
    welcomeMessage: [
      '欢迎来到是z豪的博客，随便逛逛吧～',
      '诶，你又来折腾啦？',
      '今天也要好好写代码哦！'
    ],
    messages: [
      '菜就多练，输不起就别玩。',
      'ESP32 又双叒叕烧了？检查一下接线吧。',
      '记得给博客备份，别只在本地留着。',
      '喝口水，看看远方，保护一下眼睛。',
      'Ctrl + S 是世界上最动听的快捷键。',
      '有问题先看日志，日志不会骗你。',
      '困了就睡，代码明天还在。'
    ],
    duration: 4000,
    interval: 9000
  }

  function copyTips(patch) {
    return Object.assign({}, commonTips, patch || {})
  }

  function boot() {
    if (typeof L2D_WIDGET === 'undefined' || typeof L2D_WIDGET.createWidget !== 'function') return
    try {
      window.l2dWidget = L2D_WIDGET.createWidget({
        model: [
          {
            path: '/js/live2d/models/terisa/model.json',
            scale: 1,
            tips: copyTips()
          },
          {
            path: '/js/live2d/models/cat-black/model.json',
            scale: 1,
            tips: copyTips({
              welcomeMessage: ['喵～', '小黑猫来了。'],
              messages: ['喵喵喵？', '摸鱼也要适度哦。', '再写一行就去睡觉。']
            })
          }
        ],
        position: 'bottom-left',
        size: isMobile ? 170 : 250,
        primaryColor: 'rgba(66, 90, 239, 0.9)',
        transitionType: 'slide',
        transitionDuration: 1200
      })
    } catch (err) {
      if (window.console && console.warn) console.warn('[看板娘] 初始化失败：', err)
    }
  }

  function schedule() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(boot, { timeout: 3000 })
    } else {
      setTimeout(boot, 1200)
    }
  }

  if (document.readyState === 'complete') {
    schedule()
  } else {
    window.addEventListener('load', schedule, { once: true })
  }
})()
