/**
 * 看板娘（Live2D）初始化
 *
 * 运行时：oh-my-live2d（MIT）https://github.com/oh-my-live2d/oh-my-live2d
 *          + Live2D 官方 Cubism Core（自托管，随仓库一起走 GitHub Pages）
 * 模型：DS鲸鱼娘（DeepSeek 大肥鱼），Cubism 5
 * 授权：CC BY-NC-SA 4.0（署名 · 非商业 · 相同方式共享）
 * 版权链：上善无形（原作「溟月」）→ ZipZipPipe（DeepSeek 女仆二创）→ 氵六青（本模型）
 *       模型包内的 LICENSE / README.md 已随模型一起保留在 models/ds-whale-girl/
 */
(function () {
  if (window.__l2dBooted) return
  window.__l2dBooted = true

  function boot() {
    if (typeof OML2D === 'undefined' || typeof OML2D.loadOml2d !== 'function') return
    if (!window.Live2DCubismCore) {
      if (window.console && console.warn) console.warn('[看板娘] Cubism Core 未加载，跳过初始化')
      return
    }

    try {
      window.oml2d = OML2D.loadOml2d({
        dockedPosition: 'left',
        // 模型 4MB，移动端就不折腾流量和遮挡了
        mobileDisplay: false,
        sayHello: false,
        transitionTime: 1000,
        primaryColor: '#425aef',
        parentElement: document.body,
        models: [
          {
            path: '/js/live2d/models/ds-whale-girl/c_0120.model3.json',
            scale: 0.12,
            position: [0, 40],
            stageStyle: { height: 420 }
          }
        ],
        tips: {
          idleTips: {
            wordTheDay: false, // 不走一言接口，全部走本地文案
            duration: 4500,
            interval: 12000,
            message: [
              '菜就多练，输不起就别玩。',
              'ESP32 又双叒叕烧了？检查一下接线吧。',
              '记得给博客备份，别只在本地留着。',
              '喝口水，看看远方，保护一下眼睛。',
              'Ctrl + S 是世界上最动听的快捷键。',
              '有问题先看日志，日志不会骗你。',
              '困了就睡，代码明天还在。',
              '点我一下试试，我会动的。'
            ]
          },
          copyTips: {
            duration: 3000,
            message: '复制成功，转载记得注明出处哦～'
          }
        }
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
