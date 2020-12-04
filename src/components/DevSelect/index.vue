<template>
  <div>
    <keep-alive />
    <el-select v-model="AgentBoxId" placeholder="Select Device" :default-first-option="true" @change="SelectedId">
      <el-option
        v-for="item in adminOf"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { EventBus } from '@/utils/event'

export default {
  data() {
    return {
      AgentBoxId: 'agentX509',
      adminOf: [
        {
          id: '',
          name: ''
        }
      ]
    }
  },
  methods: {
    SelectedId() {
      EventBus.$emit('update:id', this.AgentBoxId)
    }
  },

  apollo: {
    adminOf: gql`query {
     adminOf(id: "dfedb92d-1cb8-4fc8-a413-07f704a72c1a"){
      id
      name
      }
  }`
  }

}

</script>
