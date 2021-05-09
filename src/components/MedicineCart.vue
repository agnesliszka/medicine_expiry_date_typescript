<template>
  <div class="medicineCart">
    <el-form label-position="top" :inline="true" class="form">
      <el-form-item>
        <el-input
          v-model="medicineNameInput"
          placeholder="Input a medicine"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="block">
          <el-date-picker
            v-model="expiryDate"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="warning" @click="addMedicine"
          >Add a medicine</el-button
        >
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
  expiryDate = "";
  medicineList: {
    name: string;
    date: string;
    expired: boolean;
  }[] = [];

  isMedicineExpired(expiryDate: string) {
    let today = new Date().setHours(0, 0, 0, 0);
    let medicineExpiryDate = new Date(expiryDate).setHours(0, 0, 0, 0);
    if (medicineExpiryDate < today) {
      return true;
    } else {
      return false;
    }
  }

  addMedicine() {
    this.medicineList.push({
      name: this.medicineNameInput,
      date: this.expiryDate,
      expired: this.isMedicineExpired(this.expiryDate),
    });

    console.log("submit!");
    console.log(this.medicineList);
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