import * as am5 from '@amcharts/amcharts5'
import * as am5percent from '@amcharts/amcharts5/percent'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'

let root
let chart

export function createPieChart(containerSelector) {
  root = am5.Root.new(containerSelector)
  root.setThemes([am5themes_Animated.new(root)])

  chart = root.container.children.push(
    am5percent.PieChart.new(root, {
      panY: false,
      layout: root.verticalLayout
    })
  )

  let series = chart.series.push(
    am5percent.PieSeries.new(root, {
      name: 'Series',
      categoryField: 'country',
      valueField: 'sales'
    })
  )
  series.data.setAll([
    {
      country: 'Terror',
      sales: 100000
    },
    {
      country: 'Comedia',
      sales: 160000
    },
    {
      country: 'Ação',
      sales: 80000
    },
    {
      country: 'Drama',
      sales: 200000
    },
    {
      country: 'Suspense',
      sales: 100000
    },
    {
      country: 'Romance',
      sales: 200000
    }
  ])

  chart.appear(1000, 100)
}
