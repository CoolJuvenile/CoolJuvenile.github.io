/**
 * 鼠标点击特效：点击处迸出一圈小心心
 * 纯原生实现，无依赖；document 级监听，pjax 切页不受影响。
 * 想改颜色 / 数量 / 图案，改下面的 COLORS 与 CHAR 即可。
 */
(function () {
  if (window.__cursorFx) return;
  window.__cursorFx = true;

  var COLORS = ['#ff6b81', '#ff7f50', '#f368e0', '#ff4757', '#eccc68', '#70a1ff'];
  var CHAR = '❤';

  function spawn(x, y) {
    var count = 8 + Math.floor(Math.random() * 4);
    for (var i = 0; i < count; i++) {
      var el = document.createElement('span');
      el.className = 'cursor-fx-heart';
      el.textContent = CHAR;
      el.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      el.style.fontSize = Math.round(10 + Math.random() * 10) + 'px';

      var ang = Math.random() * Math.PI * 2;
      var dist = 28 + Math.random() * 52;
      el.style.setProperty('--dx', (Math.cos(ang) * dist).toFixed(1) + 'px');
      el.style.setProperty('--dy', (-34 - Math.random() * 72).toFixed(1) + 'px');
      el.style.setProperty('--rot', Math.round(Math.random() * 60 - 30) + 'deg');

      document.body.appendChild(el);
      (function (node) {
        setTimeout(function () { node.remove(); }, 1100);
      })(el);
    }
  }

  document.addEventListener(
    'click',
    function (e) {
      if (e.button !== 0) return;
      spawn(e.clientX, e.clientY);
    },
    true
  );
})();
