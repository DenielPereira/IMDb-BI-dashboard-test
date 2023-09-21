import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

let root
let chart

export function createBarChart(containerSelector) {
  root = am5.Root.new(containerSelector)
  root.setThemes([am5themes_Animated.new(root)])

  chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout
    })
  )

  let legend = chart.children.push(am5.Legend.new(root, {}))
  legend.data.setAll(chart.series.values)

  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "selectXY"
  }));
}

export function updateChart(data: any[]) {
  if (chart) {
    chart.series.clear()

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    )

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: 'ano'
      })
    )
    xAxis.data.setAll(data)

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'filmes_terror',
        categoryXField: 'ano'
      })
    )
    series1.data.setAll(data)
  }
  
  chart.appear(1000, 100)
}
