$(function(){
    var navList = JSON.parse(window.localStorage.getItem("navList")).data;
    var dataList = [];
    function getNewDataList() {
        for(let i=0;i<navList.length;i++){
            $.ajax({
                "url": "http://h6.duchengjiu.top/shop/api_goods.php?page=1",
                "type": "GET",
                "data": {
                    "cat_id": navList[i].cat_id
                },
                "dataType": "json",
                "async": false, 
                "success": function (res) {
                    dataList.push(
                        {
                            catName: navList[i].cat_name,
                            catCount: parseInt(res.page.count) || 0
                        }
                    )
                }
            })
    
        }
    }
    var list = getNewDataList();   
     // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
    // Step 1: 创建 Chart 对象
    const chart = new G2.Chart({
        container: 'c1', // 指定图表容器 ID
        width: 800, // 指定图表宽度
        height: 400 // 指定图表高度
    });
    // Step 2: 载入数据源
    chart.source(dataList);
    // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
    chart.interval().position('catName*catCount').color('catName')
    // Step 4: 渲染图表
    chart.render();


    var data2 = [{ year: '9', value: 155 }, { year: '10', value: 599 }, { year: '11', value: 1666 }, { year: '12', value: 2000 }, { year: '1', value: 1400 }, { year: '2', value: 5000 }, { year: '3', value: 5555 }, { year: '4', value: 8034 }, { year: '5', value: 10000 }];
    var chart2 = new G2.Chart({
        container: 'mountNode',
        forceFit: true,
        width: 800,
        height: 400,
    });
    chart2.source(data2);
    chart2.scale('value', {
        min: 0
    });
    chart2.scale('year', {
        range: [0, 1]
    });
    chart2.tooltip({
        crosshairs: {
            type: 'line'
        }
    });
    chart2.line().position('year*value');
    chart2.point().position('year*value').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
    });
    chart2.render();
       
})