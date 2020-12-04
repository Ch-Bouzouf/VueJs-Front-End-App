<template>
  <div class="apps">
    <el-table
      :data="installedApps.edges"
      style="width: 100% ;margin: 30px 60px 10px 50px;"
    >
      <el-avatar icon="el-icon-user-solid" />
      <el-table-column
        prop="node.icon"
        label="Icon"
        width="180"
      />
      <el-table-column
        prop="node.name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="node.version"
        label="Version"
      />
      <el-table-column
        prop="node.lastUpdate"
        label="last Update"
      />
    </el-table>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventAPP } from '@/utils/event2'

const GET_App = gql`query installedApps($SelectedDev: String!) {
  installedApps(filters: {idDevice: $SelectedDev}){
    edges{
    node{
        name
        icon
        version
        lastUpdate
        status
        idUser
        idDevice
    }
  }
  }
  }`

export default {
  name: 'SelectedUserDev',
  data() {
    return {
      ID: null,
      installedApps: {
        edges: [{
          node: {
            name: '',
            icon: '',
            version: '',
            lastUpdate: '',
            status: '',
            idDevice: '',
            idUser: ''
          }
        }]
      }
    }
  },

  apollo: {
    installedApps: {
      query: GET_App,
      variables() {
        return {
          SelectedDev: this.ID
        }
      }
    }
  },

  created() {
    EventAPP.$on('update:dev', (DeviceId) => {
      this.ID = DeviceId
    })
  }

}
</script>

<style scoped>

</style>
