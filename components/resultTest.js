app.component('typing-test-result', {
    template: `
        <div class="result">
            <div class="right-sec">
              <div class="wpm-score-sec">
                <h2>wpm</h2>
                <h3>{{this.score *2}}</h3>
              </div>

              <div class="timing-sec">
                <h2>time</h2>
                <h3>30s</h3>
              </div>
            </div>
                
            <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
        </div>
    `,
    props : ['score',"scorelist"]
    ,
    data() {
        return {

        }
    },
    methods: {
        // Methods Here
        scoreEachSecond(correctWord,second){
          var result = (60 * correctWord) / second;
          return result;
        }
    },
    updated() {
        // after the scorelist updated to the actuall score => creating chart

        var that = this;

        var xValues = this.scorelist[0];
        var yValues = this.scorelist[1];



        console.log(yValues)




        new Chart("myChart", {
          type: "bar",
          data: {
            labels: xValues,
            datasets: [{
              data: yValues,
              backgroundColor: "#ffc801b8",
            }]
          },
          options: {
            legend: {display: false},
            title: {
              display: true,
              text: "WPM Score",
            }
          }
        });
    }
});
  









// var xyValues = [
        //     {x:50, y:7},
        //     {x:60, y:8},
        //     {x:70, y:8},
        //     {x:80, y:9},
        // ];

        // console.log(this.test);
        //   new Chart("myChart", {
        //     type: "scatter",
        //     data: {
        //       datasets: [{
        //         pointRadius: 4,
        //         pointBackgroundColor: "rgb(0,0,255)",
        //         data: xyValues
        //       }]
        //     },
        //     options: {
        //     }
        //   });