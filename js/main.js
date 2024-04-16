$(document).ready(function(){
    $.ajax({
        url: 'https://service.taipower.com.tw/data/opendata/apply/file/d006001/001.json',
        dataType: 'json',
        type: 'GET',
        crossDomain: true,
        success: function(data) {
          console.log('请求成功:', data);
        },
        error: function(xhr, status, error) {
          console.error('请求失败:', error);
          $.getJSON('json/001.json',function(data){
            var titleList=[]
            window.chartOptions.series.forEach((optionItem)=>{
              titleList.push(optionItem.name)
            })
            var dataList=[]
            data.aaData.forEach((item)=>{
              if(item[1].split('(')[0]=='小計'){
                dataList.push(
                  {
                    name:item[0],
                    data:item[3].split('(')[0]
                  }
                )
              }
            })
            dataList.forEach((dataItem) => {
                titleList.forEach((title, idx) => {
                    if (dataItem.name.includes(title)) {
                    window.chartOptions.series[idx].data[0] += parseInt(dataItem.data)
                    }
                });
                if(!(titleList.some((e)=>dataItem.name.includes(e)))){
                    window.chartOptions.series[5].data[0] += parseInt(dataItem.data)
                }
            })
            Highcharts.chart('chart',window.chartOptions)
          })
        }
      });
})