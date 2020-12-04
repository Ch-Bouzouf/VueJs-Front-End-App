<template>
  <div class="EndDevice ">
    <el-switch
      v-model="value2"
      class="switch"
      style="display: block"
      active-color="#13ce66"
      inactive-color="#21A5D6"
      active-text="Who is Around"
      inactive-text="All User"
    />
    <el-table :data="agentBox.edges" :row-key="row => row.node.id" border fit style="width: 100% ;margin: 30px 60px 10px 50px;">
      <el-table-column width="100px" align="center" label="Device Icon">
        <span><h1><i class="el-icon-monitor" /></h1></span>
      </el-table-column>
      <el-table-column prop="node.devices.edges[0].node.name" width="130px" align="center" label="Device name" />
      <el-table-column prop="" width="100px" align="center" label="Status">
        <el-tag type="success">Online</el-tag>
      </el-table-column>
      <el-table-column prop="node.devices.edges[3].node.users.username" width="120px" align="center" label="User name" />
      <el-table-column prop="" width="110px" align="center" label="Schedule">
        <el-button type="primary" size="mini" @click="dialogFormVisible=true">
          Assign
        </el-button>
      </el-table-column>
      <el-table-column prop="node.devices.edges[0].node.addressip" width="120px" align="center" label="IP Adress" />
      <el-table-column prop="" width="100px" align="center" label="Last Seen"> 12:15:16 </el-table-column>
      <el-table-column prop="" width="100px" align="center" label="Kicked out">
        <el-tag type="danger">FALSE</el-tag>
      </el-table-column>
      <el-table-column prop="node.devices.edges[0].node.manufacturer" width="110px" align="center" label="Manufactuer Name" />
      <el-table-column prop="node.devices.edges[0].node.osversion" width="110px" align="center" label="Manufactuer Model" />
    </el-table>
    <el-dialog title="New schedule" style="margin-bottom: 20px;text-align: center;" :visible.sync="dialogFormVisible">
      <schedule style="width:70%;" />
      <el-button round class="btn3" type="primary" size="mini" @click="dialogFormVisible=false">
        <h4>  SAVE </h4>
      </el-button>
    </el-dialog>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/utils/event'
import schedule from './schedule'

const GET_DEVICE = gql`query AgentBox($SelectedId: String!) {
  agentBox(filters: {id: $SelectedId}){
    edges{
      node{
        id
        devices{
          edges{
            node{
              id
              name
              addressip
              typedevice
              osversion
              manufacturer
              users{
                username
              }
            }
          }
        }
        
      }
    }
  }
  }`

export default {
  name: 'EndDevice',
  components: { schedule },
  data() {
    return {
      value2: true,
      dialogFormVisible: false,
      ID: '74254647-9110-4316-8533-9cf4631f1c57',
      agentBox: {
        edges: [
          {
            node: {
              id: '',
              devices: {
                edges: [{
                  node: {
                    id: '',
                    name: '',
                    addressip: '',
                    typedevice: '',
                    osversion: '',
                    manufacturer: '',
                    users: {
                      username: ''
                    }
                  }
                }]
              }

            }
          }]
      }

    }
  },

  apollo: {
    agentBox: {
      query: GET_DEVICE,
      variables() {
        return {
          SelectedId: this.ID
        }
      }

    }
  },
  created() {
    EventBus.$on('update:id', (AgentBoxId) => {
      this.ID = AgentBoxId
    })
  }

}
</script>

<style lang="scss" scoped>
.switch{
  margin-top: 30px;
  margin-right: 60px ;
  text-align: right;
}
  .enddevice{
    background: #f4f4f4;
    border-bottom: 1px  #ccc  dotted;
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-bottom: 60px;
  }

  .document-btn {
    flex-shrink: 0;
    display: block;
    height: 60px;
    width: 400px;
    color:#043547;
    margin-bottom: 50px;
    line-height: 60px;
    font-size: 20px;
    text-align: center;

  }
  .document-icon{
    flex-shrink: 0;
    display: block;
    height: 60px;
    width: 250px;
    color:#21A5D6;
    margin-bottom: 50px;
    line-height: 0px;
    font-size: 20px;
    text-align: center;
  }

</style>
