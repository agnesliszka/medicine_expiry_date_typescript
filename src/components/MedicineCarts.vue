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
        <el-button
          type="warning"
          :disabled="addButtonDisabled"
          @click="addMedicine()"
          >Add a medicine</el-button
        >
      </el-form-item>
    </el-form>
    <MedicineCart
      :medicineList="medicineList"
      :isMedicineExpired="isMedicineExpired"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import MedicineCart from "./MedicineCart.vue";

@Component({
  components: {
    MedicineCart,
  },
})
export default class MedicineCarts extends Vue {
  // @Prop() baseColor!: string;

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

  get addButtonDisabled() {
    if (this.ruleForm.medicineName === "" || this.ruleForm.expiryDate === "") {
      return true;
    } else {
      return false;
    }
  }

  isMedicineExpired(expiryDate: string): boolean {
    let today = moment(new Date()).format("DD-MM-YYYY");
    let medicineExpiryDate = expiryDate;
    if (medicineExpiryDate < today) {
      return true;
    } else {
      return false;
    }
  }

  addMedicine(): void {
    let formName: any = this.$refs.ruleForm;
    if (formName.validate) {
      this.medicineList.push({
        medicineName: this.ruleForm.medicineName,
        expiryDate: moment(this.ruleForm.expiryDate).format("DD-MM-YYYY"),
        expired: this.isMedicineExpired(this.ruleForm.expiryDate),
      });
      console.log("submit!");
      console.log(this.medicineList);
    } else {
      console.log("error submit!!");
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