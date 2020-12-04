/* eslint-disable */
<template>
  <div class="installed-apps">
    <keep-alive />
    <span class="apps">
      <el-form ref="form" :inline="true" class="demo-form-inline" label-width="200px">
        <el-form-item label="Select a User">
          <el-select v-model="UserId" placeholder="Username">
            <el-option
              v-for="index in allUsers.edges"
              :key="index.node.id"
              :label="index.node.username"
              :value="index.node.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Select a Device">
          <el-select v-model="DeviceId" placeholder="Device name" @change="SelectedDev">
            <el-option
              v-for="index in device.edges"
              :key="index.node.id"
              :label="index.node.name"
              :value="index.node.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </span>
    <SelectedUserDev />
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SelectedUserDev from './SelectDevice'
import { EventAPP } from '@/utils/event2'

const GET_Dev = gql`query device($SelectedUser: String!) {
  device(filters: {idUser: $SelectedUser}){
    edges{
    node{
      id
      idUser
      name
    }
  }
  }
  }`

export default {
  name: 'App',
  components: { SelectedUserDev },
  data() {
    return {
      UserId: null,
      DeviceId: null,
      allUsers: {
        edges: [
          {
            node: {
              id: '',
              username: ''
            }
          }
        ]
      },
      device: {
        edges: [
          {
            node: {
              id: '',
              idUser: '',
              name: ''
            }
          }
        ]
      },
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
    allUsers: gql`query {
    allUsers{
    edges{
      node{
       id   
       username
      }
    }
  }
  }`,
    device: {
      query: GET_Dev,
      variables() {
        return {
          SelectedUser: this.UserId
        }
      }
    }

  },

  computed: {
    SelectedDev() {
      return EventAPP.$emit('update:dev', this.DeviceId)
    }
  }

}
</script>

<style scoped>
.installed-apps{
  text-align: right;
  margin-top: 50px;
}

</style>
