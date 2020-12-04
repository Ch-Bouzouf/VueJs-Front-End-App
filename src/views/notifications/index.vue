<template>
  <div class="Notifications">
    <el-alert
      title="succès"
      type="success"
      description="Plus de texte pour décrire."
      show-icon
    />
    <br>
    <el-alert
      title="information"
      type="info"
      description="Plus de texte pour décrire."
      show-icon
    />
    <br>
    <el-alert
      title="avertissement"
      type="warning"
      description="Plus de texte pour décrire."
      show-icon
    />
    <br>
    <el-alert
      title="erreur"
      type="error"
      description="Plus de texte pour décrire."
      show-icon
    />
  </div>
</template>

<script>

export default {
  name: 'Notifications'

}

</script>

<style scoped>
.Notifications{
  margin-top: 4%;
}
</style>
