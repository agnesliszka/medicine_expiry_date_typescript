<template>
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class MedicineCart extends Vue {
  @Prop() medicineList!: {
    medicineName: string;
    expiryDate: string;
    expired: boolean;
  }[];
  @Prop() isMedicineExpired!: any;

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