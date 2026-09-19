/* ============================================================
   stats.js —— 使用统计（复用课堂六的 ECharts 图表代码）
   加载 data/data.json，渲染各自习室使用量柱状图
   检查点：标题、单位、数据来源齐全；断网时有提示
   ============================================================ */

const statusEl = document.querySelector('#status');
const sourceEl = document.querySelector('#data-source');
let chart = null;

const renderChart = (data) => {
  if (chart === null) {
    chart = echarts.init(document.querySelector('#usage-chart'));
    window.addEventListener('resize', () => chart.resize());
  }

  chart.setOption({
    title: { text: data.title, left: 'center', textStyle: { fontSize: 16 } },
    tooltip: {
      trigger: 'axis',
      valueFormatter: value => value + ' ' + data.unit
    },
    grid: { left: 72, right: 30, top: 60, bottom: 72 },
    xAxis: {
      type: 'category',
      data: data.rooms,
      axisLabel: { interval: 0, rotate: 28 }
    },
    yAxis: {
      type: 'value',
      name: '使用量（' + data.unit + '）'
    },
    series: [{
      name: '使用量',
      type: 'bar',
      data: data.counts,
      barMaxWidth: 46,
      itemStyle: { color: '#1b6ec2', borderRadius: [4, 4, 0, 0] }
    }]
  }, true);
};

const loadData = async () => {
  statusEl.style.display = 'none';
  statusEl.classList.remove('alert-danger', 'alert-warning');

  try {
    const response = await fetch('data/data.json');
    if (!response.ok) {
      throw new Error('HTTP ' + response.status);
    }
    const data = await response.json();

    // 空数据自查
    if (!Array.isArray(data.counts) || data.counts.length === 0) {
      statusEl.textContent = '暂无数据：data.json 中没有使用量记录';
      statusEl.classList.add('alert-warning');
      statusEl.style.display = 'block';
      return;
    }

    sourceEl.textContent = '数据来源：' + data.source + '；单位：' + data.unit;
    renderChart(data);
  } catch (error) {
    // 断网 / 文件缺失时的失败提示（已捕获，不会在 Console 产生未处理错误）
    statusEl.textContent = '数据加载失败（可能处于断网状态）：' + error.message;
    statusEl.classList.add('alert-danger');
    statusEl.style.display = 'block';
    sourceEl.textContent = '数据来源：加载失败，请检查网络后点击“重新加载数据”';
  }
};

document.querySelector('#reload-btn').addEventListener('click', loadData);

loadData();
