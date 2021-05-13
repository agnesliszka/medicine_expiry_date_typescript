<template>
  <div class="medicineCart">
    <el-form
      label-position="top"
      :model="ruleForm"
      :rules="formRules"
      :inline="true"
      class="form"
      ref="ruleForm"
    >
      <el-form-item prop="medicineName">
        <el-input
          v-model="ruleForm.medicineName"
          placeholder="Input a medicine"
        ></el-input>
      </el-form-item>
      <el-form-item prop="expiryDate">
        <div class="block">
          <el-date-picker
            v-model="ruleForm.expiryDate"
            type="date"
            placeholder="Pick a day"
          >
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item class="button">
        <el-button type="warning" @click="addMedicine()"
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

  ruleForm: { medicineName: string; expiryDate: string } = {
    medicineName: "",
    expiryDate: "",
  };

  medicineList: {
    medicineName: string;
    expiryDate: string;
    expired: boolean;
  }[] = [];

  formRules = {
    medicineName: [
      {
        required: true,
        message: "Please input medicine",
        trigger: "blur",
      },
      {
        min: 3,
        message: "Minimal length should be 3 letters",
        trigger: "blur",
      },
    ],
    expiryDate: [
      {
        required: true,
        message: "Please input expiry date",
        trigger: "blur",
      },
    ],
  };

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
    let formName: any = this.$refs.ruleForm;
    if (formName.validate) {
      this.medicineList.push({
        medicineName: this.ruleForm.medicineName,
        expiryDate: this.ruleForm.expiryDate,
        expired: this.isMedicineExpired(this.ruleForm.expiryDate),
      });
      console.log("submit!");
      console.log(this.medicineList);
    } else {
      console.log("error submit!!");
      return false;
    }
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