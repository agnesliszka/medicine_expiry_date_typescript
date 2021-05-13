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

    <el-card class="cardsContainer" v-if="medicineList.length > 0">
      <div slot="header" class="clearfix">
        <span class="title">Medicine list</span>
      </div>
      <div v-for="(medicine, index) in medicineList" :key="index">
        <div
          class="cart"
          :class="{ expired: isMedicineExpired(medicine.expiryDate) }"
        >
          <div>{{ medicine.expiryDate }}</div>
          <div>{{ medicine.medicineName }}</div>
          <span @click="deleteMedicine(medicine)" class="delete">X</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";

@Component
export default class MedicineCart extends Vue {
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

  deleteMedicine(medicine: {
    medicineName: string;
    expiryDate: string;
    expired: boolean;
  }) {
    const index = this.medicineList.indexOf(medicine);
    this.medicineList.splice(index, 1);
  }
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}

.title {
  font-family: Goudy Old Style;
  font-size: 20px;
}

.cardsContainer {
  width: 50%;
  margin: 0 auto;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgray;
  margin-bottom: 10px;
  padding: 3px;
  border-radius: 5px;
}

.expired {
  background-color: red;
  padding: 3px;
  border-radius: 5px;
}

.delete {
  cursor: pointer;
}

.delete:hover {
  color: #999999;
}
</style>