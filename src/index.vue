<template>
  <div id="chart" class="chart"></div>
</template>
<script>
import go from 'gojs'
import unknownImg from './asserts/images/relation/unknown.png'
import cacheImg from './asserts/images/relation/cache.png'
import databaseImg from './asserts/images/relation/database.png'
import httpImg from './asserts/images/relation/http.png'
import mqImg from './asserts/images/relation/mq.png'
import rpcImg from './asserts/images/relation/rpc.png'
import currentImg from './asserts/images/relation/current.png'

const $ = go.GraphObject.make

export default {
  data() {
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
      }
    }
  },
  mounted() {
    const diagram = $(go.Diagram, 'chart')
  }
}
</script>
<style lang="scss" scoped>
.chart {
  margin: 50px 50px 0 50px;
  height: calc(100vh - 50px);
  background-color: #ccc;
}
</style>
