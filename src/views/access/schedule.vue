<template>
  <div class="schedule-container">
    <el-form ref="form" class="demo-form-inline" label-width="150px" label-position="left">
      <el-form-item label="Schedule name :">
        <el-input v-model="input" style="width: 80%;" />
      </el-form-item>
    </el-form>
    <span class="demo"> <h4> Week days Off time: ? </h4></span>
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-button v-for="day in days" :key="day" round class="btn2" type="danger" focus size="mini" :label="day" @click="checked=true">{{ day }}</el-button>
      </el-checkbox-group>
    </div>
    <br>
    <br>
    <el-form ref="form" class="demo-form-inline" label-width="200px" label-position="left">
      <el-form-item label="Internet/App Access is OFF " />
      <el-time-picker
        v-model="value1"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </el-form>
    <span class="demo"> <h4> Week-end Off time: ? </h4></span>
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-button v-for="day in days" :key="day" round class="btn2" type="danger" focus size="mini" :label="day" @click="checked=true">{{ day }}</el-button>
      </el-checkbox-group>
    </div>
    <br>
    <br>
    <el-form ref="form" class="demo-form-inline" label-width="200px" label-position="left">
      <el-form-item label="Internet/App Access is OFF " />
      <el-time-picker
        v-model="value2"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </el-form>
    <span class="demo"> <h4> Night Off time: ? </h4></span>
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-button v-for="day in days" :key="day" round class="btn2" type="danger" focus size="mini" :label="day" @click="checked=true">{{ day }}</el-button>
      </el-checkbox-group>
    </div>
    <br>
    <br>
    <el-form ref="form" class="demo-form-inline" label-width="200px" label-position="left">
      <el-form-item label="Internet/App Access is OFF " />
      <el-time-picker
        v-model="value2"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </el-form>

  </div>
</template>

<script>
const dayOptions = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
export default {
  data() {
    return {
      checked: false,
      input: '',
      checkboxGroup1: [''],
      days: dayOptions,
      value1: [new Date(2016, 9, 10, 18, 10), new Date(2016, 9, 10, 20, 10)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    }
  }
}
</script>

<style >
.schedule-container{
    text-align: left;
    margin-bottom: 20px;
    margin-left: 70px;
}
.schedule{
    text-align: center;
}
 .demo{
     color: #EC5388;
 }
 .btn{
    margin: auto;
    position: relative;
    flex-shrink: 0;
    width: 200px;
    color:#fff;
    text-align: center;
    margin-bottom: 20px;
    border-color: black;
    border-style: solid;
    border-width: 1px;
  }
 .btn2{
   background-color: #fff;
    color:#043547;
    border-color: black;
    border-style: solid;
    border-width: 1px;
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
    width: 200px;

  }
</style>
