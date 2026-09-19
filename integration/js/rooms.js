/* ============================================================
   rooms.js —— 自习室查询（复用课堂五的筛选模式）
   数据写死在 JS 数组中，按 楼层 / 开放状态 即时过滤
   ============================================================ */

const rooms = [
  { id: 'A101', name: '第一自习室', floor: 1, seats: 80,  occupied: 62, open: true,  hours: '07:00 - 22:30' },
  { id: 'A102', name: '第二自习室', floor: 1, seats: 60,  occupied: 41, open: true,  hours: '07:00 - 22:30' },
  { id: 'A103', name: '第三自习室', floor: 1, seats: 48,  occupied: 0,  open: false, hours: '设施维护，暂停开放' },
  { id: 'B201', name: '第四自习室', floor: 2, seats: 100, occupied: 88, open: true,  hours: '08:00 - 22:00' },
  { id: 'B202', name: '第五自习室', floor: 2, seats: 72,  occupied: 35, open: true,  hours: '08:00 - 22:00' },
  { id: 'B203', name: '第六自习室', floor: 2, seats: 56,  occupied: 0,  open: false, hours: '临时关闭' },
  { id: 'C301', name: '第七自习室', floor: 3, seats: 64,  occupied: 52, open: true,  hours: '07:30 - 21:30' },
  { id: 'C302', name: '第八自习室', floor: 3, seats: 40,  occupied: 23, open: true,  hours: '07:30 - 21:30' }
];

const floorSelect = document.querySelector('#floor-filter');
const statusSelect = document.querySelector('#status-filter');
const roomList = document.querySelector('#room-list');
const resultCount = document.querySelector('#result-count');

const renderRooms = () => {
  const floor = floorSelect.value;
  const status = statusSelect.value;

  // 按楼层 + 开放状态两个条件即时筛选
  const shown = rooms.filter(room => {
    const floorOk = floor === 'all' || String(room.floor) === floor;
    const statusOk =
      status === 'all' ||
      (status === 'open' && room.open) ||
      (status === 'closed' && !room.open);
    return floorOk && statusOk;
  });

  resultCount.textContent = `共找到 ${shown.length} 间自习室`;
  roomList.innerHTML = '';

  if (shown.length === 0) {
    roomList.innerHTML = '<p class="text-muted">没有符合条件的自习室</p>';
    return;
  }

  shown.forEach(room => {
    const usage = room.seats === 0 ? 0 : Math.round(room.occupied / room.seats * 100);
    const badge = room.open
      ? '<span class="badge bg-success">开放中</span>'
      : '<span class="badge bg-secondary">已关闭</span>';

    const card = document.createElement('div');
    card.className = 'col-sm-6 col-lg-4';
    card.innerHTML = `
      <div class="card room-card ${room.open ? '' : 'closed'} h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <h2 class="h5 card-title">${room.name}</h2>
            ${badge}
          </div>
          <p class="text-muted small mb-2">位置：${room.floor} 楼 ${room.id}</p>
          <p class="mb-1">座位：${room.seats} 个
            ${room.open ? `（已用 ${room.occupied}，上座率 ${usage}%）` : ''}
          </p>
          <p class="small text-muted mb-0">开放时间：${room.hours}</p>
        </div>
      </div>`;
    roomList.appendChild(card);
  });
};

// change 即筛选，无需点击按钮
floorSelect.addEventListener('change', renderRooms);
statusSelect.addEventListener('change', renderRooms);

renderRooms();
