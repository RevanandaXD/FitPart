const ctx = document.getElementById("bar-chart").getContext('2d');
const navLink = document.querySelector('.link-container')
const toggleBtn = document.querySelector('.btn-toggle')

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Battery', 'Keyboard', 'Memory', 'Storage'],
    datasets: [{
      data: [33100, 12100, 8100, 6600],
      backgroundColor: ['#7FFF00', '#FFD311', '#F6A31E', '#EF5E25'],
      barPercentage: 1.4,
      barThickness: 17,
      categoryPercentage: 10,
      borderRadius: 2,
      borderSkipped: false
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: value => value.toLocaleString()
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          font: {
            size: 14
          }
        },
        grid: {
          display: false
        }
      }
    },
  }
});

toggleBtn.addEventListener('click', () => {
  navLink.classList.toggle('active')
})

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
