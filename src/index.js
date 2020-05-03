import './styles/base.css';
import './styles/home.css';
import Chart from 'chart.js';

var ctx = document.getElementById('myChart');
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(0, 255, 136, .2)',
        borderColor: 'rgba(255, 255, 255, .7)',
        borderWidth: 1
    }]
},
options: {
  legend: {
    display: false
  },
  scales: {
      yAxes: [{
          ticks: {
              fontColor: '#fff',
              beginAtZero: true
          }
      }],
      xAxes: [{
        ticks: {
            fontColor: '#fff'
        }
    }]
  }
}
});