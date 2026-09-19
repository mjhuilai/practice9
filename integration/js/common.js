/* ============================================================
   common.js —— 全站公共脚本
   1. 断网提示：监听 online / offline 事件，断网时显示红色横幅
   2. Console 自查：捕获页面报错，实时更新页脚徽章计数
   ============================================================ */

(function () {
  'use strict';

  // ---------- 1. 断网提示 ----------
  const updateOnlineStatus = () => {
    // navigator.onLine 为 false，或收到 offline 事件时，给 body 加类显示横幅
    document.body.classList.toggle('offline', !navigator.onLine);
  };

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  // ---------- 2. Console 自查：页面报错计数 ----------
  let errorCount = 0;

  window.addEventListener('error', () => {
    errorCount += 1;
    const badge = document.querySelector('#console-badge');
    if (badge) {
      badge.textContent = 'Console ' + errorCount + ' 条错误';
      badge.classList.add('error');
    }
  });
})();
