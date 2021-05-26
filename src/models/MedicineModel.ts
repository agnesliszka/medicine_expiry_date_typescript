export default class MedicineModel {
    medicineName: string;
    expiryDate: string;
    expired: boolean;
  
    constructor() {
        this.medicineName = '';
        this.expiryDate = '';
        this.expired = false;
    }
  }