<template>
  <div class="access-control">
    <div class="users">
      <el-button round class="btn2" type="primary" plain size="mini" @click="show=true ;show2=false; sign=false ;showimg=true">
        <h4> ALL USERS </h4>
      </el-button>
      <el-button round class="btn2" type="primary" plain size="mini" @click="show2=true ; show=false ; sign=false ;showimg=true">
        <h4> WHO IS AROUND </h4>
      </el-button>
    </div>
    <div v-if="show === true">
      <el-row v-for="admin in agentBox.edges" :key="admin.id" :gutter="10">
        <el-col v-for="index in admin.node.subscribers.edges" :key="index.node.id" :span="7">
          <span class="all-users"> <el-button v-if="sign===true" class="btn" plain @click="dialogFormVisible=true"> <el-avatar shape="square" :size="50" :src="url" /> </el-button>
            <el-avatar v-if="showimg===true" shape="square" :size="50" :src="url" />
            <p> <el-button type="info" class="size" icon="el-icon-check" circle /> {{ index.node.firstname }} </p>
            <p> <el-button type="primary" class="size" icon="el-icon-time" circle /> 12:15:16 </p> </span>
        </el-col>
      </el-row>
    </div>
    <div v-if="show2 === true">
      <el-row v-for="admin in agentBox.edges" :key="admin.id" :gutter="10">
        <el-col v-for="index in admin.node.subscribers.edges" :key="index.node.id" :span="7">
          <span class="all-users"> <el-button v-if="sign===true" class="btn" plain @click="dialogFormVisible=true"> <el-avatar shape="square" :size="50" :src="url" /> </el-button>
            <el-avatar v-if="showimg===true" shape="square" :size="50" :src="url" />
            <p> <el-button type="success" class="size" icon="el-icon-check" circle /> {{ index.node.firstname }} </p>
            <p> <el-button type="primary" class="size" icon="el-icon-time" circle /> 12:15:16 </p></span>
        </el-col>
      </el-row>
    </div>

    <div class="assign">
      <el-button round class="btn2" type="primary" plain size="mini" @click="sign=true ;showimg=false">
        <h4> ASSIGN SCHEDULE </h4>
      </el-button>
      <el-button round class="btn2" type="primary" plain size="mini" @click="sign=false ;showimg=true">
        <h4>  BLOCK USER </h4>
      </el-button>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <span class="all-users"> <el-avatar shape="square" :size="100" :src="url" /></span>
      <br>
      <br>
      <br>
      <br>
      <br>
      <el-button round class="btn3" type="primary" size="mini" @click="add=true">
        <h4>  ADD </h4>
      </el-button>
    </el-dialog>
    <el-dialog title="New schedule" style="margin-bottom: 20px;" :visible.sync="add">
      <schedule style="width:70%;" />
      <el-button style="position: relative;" round class="btn3" type="primary" size="mini" @click="add=false">
        <h4>  SAVE </h4>
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/utils/event'
import schedule from './schedule'

const GET_USER = gql`query AgentBox($SelectedId: String!) {
  agentBox(filters: {id: $SelectedId}){
    edges{
    node{
      subscribers{
        edges{
          node{
            id
            firstname
            profileImageUrl

          }
        }
      }
    }
  }
  }
  }`

export default {
  components: { schedule },

  data() {
    return {
      showimg: true,
      sign: false,
      sign2: false,
      add: false,
      show: false,
      show2: false,
      dialogFormVisible: false,
      ID: '74254647-9110-4316-8533-9cf4631f1c57',
      url: 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-user-profile-vector-png-image_4830519.jpg',
      agentBox: {
        edges: [
          {
            node: {
              subscribers: {
                edges: [{
                  node: {
                    id: '',
                    firstname: '',
                    profileImageUrl: ''
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
      query: GET_USER,
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

<style scoped>
.access-control{
  text-align: center;
  margin-top: 40px;
}
.size{
 padding: 1%;
}
.assign{
  margin-top: 180px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.users{
    margin: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-bottom: 60px;
  }
  .all-users{
    display: inline-block;
    list-style:none;
    width: 30%;
  }

  .document-btn {
    flex-shrink: 0;
    display: block;
    height: 60px;
    width: 400px;
    color:#043547;
    margin-bottom: 50px;
    margin-top: 80px;
    line-height: 60px;
    font-size: 25px;
    text-align: center;

  }
  .document-access {
    flex-shrink: 0;
    display: block;
    height: 60px;
    width: 400px;
    color:#043547;
    margin-bottom: 50px;
    margin-top: 50px;
    line-height: 60px;
    font-size: 25px;
    text-align: center;

  }
  .document-role {
    color:rgb(161, 159, 159);
    margin-bottom: 50px;
    font-size: 25px;
    text-align: center;

  }
  .document-img{
    flex-shrink: 0;
    display: block;
    height: 60px;
    width: 250px;
    margin-bottom: 50px;
    margin-top: 50px;
    font-size: 40px;
    text-align: center;
  }

  .btn{
    border-color: black;
    border-style: solid;
    border-width: 1px;
    width: 95%;
  }
  .btn2{
    background-color: #fff;
    color:#043547;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    margin: auto;
    position: relative;
    flex-shrink: 0;
    width: 200px;
    text-align: center;
    margin-bottom: 20px;

  }
  .btn3{
    background-color: #fff;
    color:#043547;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    flex-shrink: initial;
    margin: auto;
    position: center;
    text-align: center;

  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }
</style>
