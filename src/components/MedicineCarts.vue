<template>
  <div class="medicineCart">
    <div class="filters">
      <el-button
        type="danger"
        @click="showMedicineList"
        v-show="medicineList.length > 0"
        ><span v-if="isActive">Hide Medicine List</span>
        <span v-if="!isActive">Show Medicine List</span></el-button
      >
      <el-button type="info" @click="changeSortedByNameFlag">{{
        nameButtonText
      }}</el-button>
      <el-button type="info" @click="changeSortedByDateFlag">{{
        timeButtonText
      }}</el-button>
      <el-button
        type="danger"
        v-show="medicineList.length > 0"
        @click="showExpiredMedicine"
        >{{ buttonText }}</el-button
      >
    </div>

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

    <div class="block">
      <div style="color: white; margin-top: 20px">Select date range:</div>
      <el-date-picker
        @change="filterResults"
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
    </div>

    <section style="margin-top: 20px" v-if="isActive">
      <MedicineCart
        :medicineList="medicineList"
        :isMedicineExpired="isMedicineExpired"
      />
    </section>

    <section
      style="margin-top: 20px"
      class="container"
      v-if="filteredDataShown"
    >
      <MedicineCart
        :medicineList="filterResults()"
        :isMedicineExpired="isMedicineExpired"
      />
    </section>

    <section
      style="margin-top: 20px"
      class="container"
      v-if="showExpiredMedicineOnly"
    >
      <MedicineCart
        :medicineList="expiredMedicineList()"
        :isMedicineExpired="isMedicineExpired"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
import MedicineCart from "./MedicineCart.vue";
import MedicineModel from "../models/MedicineModel";

@Component({
  components: {
    MedicineCart,
  },
})
export default class MedicineCarts extends Vue {
  isActive = false;
  filteredDataShown = false;
  dateRange = [];
  sortedByNameAscendigly = true;
  sortedByDateAscendigly = true;
  showExpiredMedicineOnly = false;
  ruleForm: { medicineName: string; expiryDate: string } = {
    medicineName: "",
    expiryDate: "",
  };

  // medicineList: {
  //   medicineName: string;
  //   expiryDate: string;
  //   expired: boolean;
  // }[] = [];

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

  get nameButtonText() {
    return this.sortedByNameAscendigly
      ? "Sort by name ascendingly"
      : "Sort by name descendingly";
  }

  get timeButtonText() {
    return this.sortedByDateAscendigly
      ? "Sort by date ascendingly"
      : "Sort by date descendingly";
  }

  get buttonText() {
    return this.showExpiredMedicineOnly
      ? "Show all medicines"
      : "Show expired medicine only";
  }

  get medicineList(): MedicineModel[] {
    let medicineList = this.$store.state.medicineList;
    return medicineList;
  }

  isMedicineExpired(expiryDate: string): boolean {
    let today = moment(new Date()).format("YYYY-MM-DD");
    let medicineExpiryDate = moment(new Date(expiryDate)).format("YYYY-MM-DD");

    if (medicineExpiryDate < today) {
      return true;
    } else {
      return false;
    }
  }

  addMedicine(): void {
    let formName: any = this.$refs.ruleForm;
    if (formName.validate) {
      this.$store
        .dispatch("addMedicine", {
          medicineName: this.ruleForm.medicineName,
          expiryDate: moment(this.ruleForm.expiryDate).format("YYYY-MM-DD"),
          expired: this.isMedicineExpired(this.ruleForm.expiryDate),
        })
        .then(() => {
          console.log("medicine added");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  showMedicineList(): void {
    this.isActive = !this.isActive;
    this.showExpiredMedicineOnly = false;
    this.filteredDataShown = false;
  }

  changeSortedByNameFlag(): void {
    if (this.sortedByNameAscendigly) {
      this.sortMedicineListByNameAscendingly();
    } else if (!this.sortedByNameAscendigly) {
      this.sortMedicineListByNameDescendingly();
    }
    this.sortedByNameAscendigly = !this.sortedByNameAscendigly;
  }

  changeSortedByDateFlag() {
    if (this.sortedByDateAscendigly) {
      this.sortMedicineListByDateAscendingly();
    } else if (!this.sortedByDateAscendigly) {
      this.sortMedicineListByDateDescendingly();
    }
    this.sortedByDateAscendigly = !this.sortedByDateAscendigly;
  }

  sortMedicineListByNameAscendingly(): any {
    function compare(
      a: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      },
      b: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      }
    ) {
      if (a.medicineName < b.medicineName) return -1;
      if (a.medicineName > b.medicineName) return 1;
      return 0;
    }
    return this.medicineList.sort(compare);
  }

  sortMedicineListByNameDescendingly(): any {
    function compare(
      a: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      },
      b: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      }
    ) {
      if (a.medicineName < b.medicineName) return 1;
      if (a.medicineName > b.medicineName) return -1;
      return 0;
    }
    return this.medicineList.sort(compare);
  }

  sortMedicineListByDateAscendingly(): any {
    function compare(
      a: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      },
      b: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      }
    ) {
      if (a.expiryDate < b.expiryDate) return -1;
      if (a.expiryDate > b.expiryDate) return 1;
      return 0;
    }
    return this.medicineList.sort(compare);
  }

  sortMedicineListByDateDescendingly(): any {
    function compare(
      a: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      },
      b: {
        medicineName: string;
        expiryDate: string;
        expired: boolean;
      }
    ) {
      if (a.expiryDate < b.expiryDate) return 1;
      if (a.expiryDate > b.expiryDate) return -1;
      return 0;
    }
    return this.medicineList.sort(compare);
  }

  showExpiredMedicine(): void {
    this.isActive = false;
    this.showExpiredMedicineOnly = !this.showExpiredMedicineOnly;
  }

  expiredMedicineList(): any {
    return this.medicineList.filter(function (medicine) {
      return medicine.expired;
    });
  }

  filterResults(): any {
    this.isActive = false;
    this.filteredDataShown = true;

    const beginningDate: Date = this.dateRange[0];
    const endDate: Date = this.dateRange[1];
    const filteredElements: [] = [];
    this.medicineList.forEach((medicine) => {
      if (
        new Date(moment(medicine.expiryDate).format("YYYY-MM-DD")) >
          beginningDate &&
        new Date(moment(medicine.expiryDate).format("YYYY-MM-DD")) < endDate
      ) {
        filteredElements.push(medicine);
      }
    });
    return filteredElements;
  }
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filters {
  margin-bottom: 20px;
}
</style>