<template>
  <div class="tab-container">
    <div v-for="admin in agentBox.edges" :key="admin.id">
      <div v-for="index in admin.node.subscribers.edges" :key="index.node.id" class="users">
        <span class="document-img"> <el-avatar shape="square" :size="100" :src="url" /> </span>
        <span class="document-btn"> {{ index.node.firstname }} </span>
        <span class="document-access"> Access : <span class="color1"> Full</span>
          <p class="document-role"> Role : <span class="color2"> Admin</span> </p>
        </span>
      </div>
    </div>
    <el-button round class="btn" type="primary" size="mini" @click="dialogFormVisible=true">
      <h4> ADD USER </h4>
    </el-button>
    <el-dialog title=" ADD USER" :visible.sync="dialogFormVisible">

      <div slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button class="cancel-button" @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button :disabled="loading" class="confirm-button" type="primary" @click="mutate()">Confirm</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/utils/event'

const GET_USER = gql`query AgentBox($SelectedId: String!) {
  agentBox(filters: {id: $SelectedId}){
    edges{
    node{
      subscribers{
        edges{
          node{
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
  data() {
    return {
      ID: '74254647-9110-4316-8533-9cf4631f1c57',
      url: 'https://upload.wikimedia.org/wikipedia/commons/1/12/User_icon_2.svg',
      dialogFormVisible: false,
      agentBox: {
        edges: [
          {
            node: {
              subscribers: {
                edges: [{
                  node: {
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
.tab-container{
  text-align: center;
}
.users{
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
  .color1{
    font-size: 25px;
    color: #006600;
    margin-left: 40px;
  }
  .color2{
    margin-left: 45px;
  }
  .btn{
    margin: auto;
    position: relative;
    flex-shrink: 0;
    width: 200px;
    color:#043547;
    text-align: center;
    margin-bottom: 20px;
  }
  .cancel-button{
    background-color: #fff;
    color: black;
    border-color: black;
    border-style: solid;
    border-width: 1px;

  }
  .confirm-button{
    border-color: black;
    border-style: solid;
    border-width: 1px;

  }

</style>
