const app = Vue.createApp({
    data() {
        return {
            typing_test_component : true,
            result_test_component : false,
            typing_test_score : 0,
            typing_chart_score : 0,
        }
    },
    methods: {
        // Methods Area
        showHideComponents(value,chart_list){

            var score3seconds = []
            var j = 0;  
            for (var j = 0; j < chart_list.length; j++) {
                if (chart_list[j].second % 2 == 0){
                    score3seconds.push(chart_list[j])
                }
            }
            chart_list = score3seconds


            
            var listResult = []
            var i = 0;
            for (i = 0; i < chart_list.length; i++) {
                // drte in case fach kaykun i == 0
                if (i > 0){
                    var scoreItem_before = chart_list[i-1].correctWord;
                    var scoreItem = chart_list[i].correctWord;
                    var score_period = scoreItem - scoreItem_before;
                    var scoreWpm = (60 * score_period) / 2;

                    var n_dict = {"x":chart_list[i].second,"y":scoreWpm}
                    listResult.push(n_dict);
                }
            }



            var k = 0;
            var xValues = [];
            var yValues = [];

            for (k ; k < listResult.length ; k++){
                xValues.push(listResult[k].x);
                yValues.push(listResult[k].y);
            }
            var final_result = [xValues,yValues]
            this.typing_chart_score = final_result
            this.typing_test_score = value;
            this.typing_test_component = !this.typing_test_component;
            this.result_test_component = !this.result_test_component;
        }
    }
    ,
    mounted() {
        // Mounted Function
    }
})