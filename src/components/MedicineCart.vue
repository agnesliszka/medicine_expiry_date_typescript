<template>
  <div class="medicineCart">
    <el-form
      label-position="top"
      :inline="true"
      :model="formInline"
      class="form"
    >
      <el-form-item>
        <el-input
          v-model="medicineNameInput"
          placeholder="Input a medicine"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <el-date-picker v-model="date" type="date" placeholder="Pick a day">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="warning" @click="onSubmit">Add a medicine</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class MedicineCart extends Vue {
  // @Prop() private msg!: string;

  medicineNameInput = "";
  date = "";

  onSubmit() {
    console.log("submit!");
  }
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>