<template>
  <div class="wrap">
    <div
      id="overview"
      class="overview"
    ></div>
    <div
      id="chart"
      class="chart"
    ></div>
  </div>
</template>
<script>
// import go from 'gojs/release/go-debug'
import go from './lib/js/go'
import ZoomSlider from './lib/js/zoom'
import './lib/css/zoom.css'
import unknownImg from './asserts/images/relation/unknown.png'
import cacheImg from './asserts/images/relation/cache.png'
import databaseImg from './asserts/images/relation/database.png'
import httpImg from './asserts/images/relation/http.png'
import mqImg from './asserts/images/relation/mq.png'
import rpcImg from './asserts/images/relation/rpc.png'
import currentImg from './asserts/images/relation/current.png'
import requestData from './data.json'

const $ = go.GraphObject.make
const originNodes = requestData.result.nodes
const originEdges = requestData.result.calls

export default {
  data () {
    return {
      imgMap: {
        Tomcat: httpImg,
        HttpClient: `${httpImg}`,
        OKHttp: `${httpImg}`,
        SpringMVC: `${httpImg}`,
        NutzHttp: `${httpImg}`,
        Dubbo: `${unknownImg}`,
        Motan: `${unknownImg}`,
        Resin: `${unknownImg}`,
        Feign: `${unknownImg}`,
        SpringRestTemplate: `${unknownImg}`,
        Struts2: `${unknownImg}`,
        NutzMVC: `${unknownImg}`,
        JettyClient: `${unknownImg}`,
        JettyServer: `${unknownImg}`,
        ShardingJDBC: `${unknownImg}`,
        GRPC: `${rpcImg}`,
        ElasticJob: `${unknownImg}`,
        ServiceComb: `${unknownImg}`,
        Hystrix: `${unknownImg}`,
        Jedis: `${cacheImg}`,
        'jdbc-jdbc-driver': `${unknownImg}`,
        'mysql-connector-java': `${databaseImg}`,
        ojdbc: `${unknownImg}`,
        Spymemcached: `${cacheImg}`,
        Xmemcached: `${cacheImg}`,
        'postgresql-jdbc-driver': `${databaseImg}`,
        'rocketMQ-producer': `${mqImg}`,
        'rocketMQ-consumer': `${mqImg}`,
        'kafka-producer': `${mqImg}`,
        'kafka-consumer': `${mqImg}`,
        'mongodb-driver': `${databaseImg}`,
        SOFARPC: `${unknownImg}`,
        'activemq-producer': `${mqImg}`,
        'activemq-consumer': `${mqImg}`,
        'transport-client': `${unknownImg}`,
        Undertow: `${unknownImg}`,
        'rabbitmq-producer': `${mqImg}`,
        'rabbitmq-consumer': `${mqImg}`,
        Canal: `${unknownImg}`,
        Gson: `${unknownImg}`,
        Redisson: `${cacheImg}`,
        Lettuce: `${unknownImg}`,
        Zookeeper: `${unknownImg}`,
        'Vert.x': `${unknownImg}`,
        ShardingSphere: `${unknownImg}`,
        'spring-cloud-gateway': `${unknownImg}`,
        RESTEasy: `${unknownImg}`,
        solrj: `${unknownImg}`,
        current: `${currentImg}`
      },
      diagram: null,
      sourceData: null
    }
  },
  mounted () {
    const sourceData = this.getData()
    this.initChart(sourceData)
  },
  methods: {
    initChart (sourceData) {
      this.diagram = $(go.Diagram, 'chart', {
        initialContentAlignment: go.Spot.Center,
        initialAutoScale: go.Diagram.UniformToFill,
        // 去除选中蓝色边框
        nodeSelectionAdornmentTemplate:
          $(go.Adornment, "Auto",
            $(go.Shape, "Rectangle", { fill: "white", stroke: null }),
          ),
        layout: $(go.ForceDirectedLayout, { maxIterations: 200, defaultSpringLength: 30, defaultElectricalCharge: 200 }
        )
      })
      this.$nextTick(() => {
        let hiddenNodes = []
        let showNodes = []
        let hiddenEdges = []
        const mouseEnter = (e, obj, prev) => {
          const nodeId = obj.data.key
          const nodes = this.sourceData.nodes;
          const edges = this.sourceData.edges;
          edges.forEach(edge => {
            if (edge.from !== nodeId && edge.to !== nodeId) {
              hiddenEdges.push(`${edge.from}&${edge.to}`);
            } else {
              if (!showNodes.includes(edge.from)) {
                showNodes.push(edge.from);
              }
              if (!showNodes.includes(edge.to)) {
                showNodes.push(edge.to);
              }
            }
          });
          nodes.forEach(node => {
            if (!showNodes.includes(node.key)) {
              hiddenNodes.push(node.key);
            }
          });
          this.diagram.model.startTransaction("flash");
          hiddenNodes.forEach(key => {
            const node = this.diagram.findNodeForKey(key)
            const links = node.findLinksConnected()
            node.opacity = 0
            links.each(link => {
              const compareEdgeInfo = `${link.data.from}&${link.data.to}`
              if (hiddenEdges.includes(compareEdgeInfo)) {
                link.opacity = 0
              }
            })
          })
          this.diagram.model.commitTransaction("flash");
        }
        const mouseLeave = (e, obj, next) => {
          this.diagram.model.startTransaction("flash");
          hiddenNodes.forEach(key => {
            const node = this.diagram.findNodeForKey(key)
            const links = node.findLinksConnected()
            node.opacity = 1
            links.each(link => {
              const compareEdgeInfo = `${link.data.from}&${link.data.to}`
              if (hiddenEdges.includes(compareEdgeInfo)) {
                link.opacity = 1
              }
            })
          })
          hiddenNodes = []
          hiddenEdges = []
          showNodes = []
          this.diagram.model.commitTransaction("flash");
        }
        // node
        this.diagram.nodeTemplate = $(go.Node, 'Vertical',
          {
            mouseEnter: mouseEnter,
            mouseLeave: mouseLeave
          },
          $(go.Picture, { width: 50, height: 50 }, new go.Binding('source', 'picUrl')),
          $(go.TextBlock, '', {}, new go.Binding('text', 'name'))
        )
        // link
        this.diagram.linkTemplate =
          $(go.Link,
            // 默认的路由 go.Link.Normal
            // 默认角度值 0
            { routing: go.Link.Normal, corner: 5, selectable: false },
            $(go.Shape, { strokeWidth: 1, stroke: "#e7e7e9" }), // 线的宽度和笔画的颜色

            // 如果我们要显示箭头，就应该定义一个有箭头的形状
            $(go.Shape, { toArrow: "Standard", fill: '#e7e7e9', stroke: null })
          )
        const model = $(go.GraphLinksModel)
        model.nodeDataArray = sourceData.nodes ? sourceData.nodes : []
        model.linkDataArray = sourceData.edges ? sourceData.edges : []
        this.diagram.model = model

        // mini map
        $(go.Overview, "overview",
          { observed: this.diagram, contentAlignment: go.Spot.Center })

        // zoom tool
        new ZoomSlider(this.diagram,
          {
            // alignment: go.Spot.TopRight, alignmentFocus: go.Spot.TopRight,
            size: 150, buttonSize: 20, orientation: 'vertical'
          });
      })
    },
    getData () {
      const nodes = originNodes.map(node => {
        return {
          key: node.id ? node.id.toString() : "",
          id: node.id ? node.id.toString() : "",
          name: node.name,
          type: node.type,
          picUrl: this.imgMap[node.type] ? this.imgMap[node.type] : unknownImg,
          visible: true
        };
      });
      const edges = originEdges.map(edge => {
        return {
          from: edge.source ? edge.source.toString() : "",
          to: edge.target ? edge.target.toString() : "",
          data: {
            id: edge.id ? "" : edge.id.toString()
          }
        };
      });
      const sourceData = {
        nodes,
        edges
      }
      this.sourceData = sourceData
      return sourceData
    }
  }
}
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}
.chart {
  overflow-y: hidden;
  overflow-x: hidden;
  height: 100%;
  background-color: #fff;
  border: solid 1px #ccc;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  div {
    overflow-y: hidden !important;
    overflow-x: hidden !important;
  }
}
.wrap {
  position: relative;
  height: calc(100vh - 20px);
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  .overview {
    position: absolute;
    width: 200px;
    height: 200px;
    bottom: 25px;
    right: 25px;
    border: 1px solid #ccc;
    background-color: #eee;
    z-index: 2000;
  }
}
</style>
