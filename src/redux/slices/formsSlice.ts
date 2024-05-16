import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Gabarit, ProductAndCategory } from "@prisma/client";

// Define a type for the slice state
interface FormsState {
  productForm: {
    productAndCategory: ProductAndCategory | null;
    costPrice: number;
    priceBeforeDiscount: number;
    discount: number;
  };
  marketForm: {
    // габариты
    gabarit: Gabarit | null;
    // процент выкупа
    redemptionPercentage: number;
  };
  // количество товаров на складе
  balanceInStock: number;
}

const initialState: FormsState = {
  productForm: {
    productAndCategory: null,
    costPrice: 0,
    priceBeforeDiscount: 0,
    discount: 0,
  },
  marketForm: {
    gabarit: null,
    redemptionPercentage: 0,
  },
  balanceInStock: 0,
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setProductAndCategory: (
      state,
      action: PayloadAction<ProductAndCategory>
    ) => {
      state.productForm.productAndCategory = action.payload;
    },
    setCostPrice: (state, action: PayloadAction<number>) => {
      state.productForm.costPrice = action.payload;
    },

    setPriceBeforeDiscount: (state, action: PayloadAction<number>) => {
      state.productForm.priceBeforeDiscount = action.payload;
    },

    setDiscount: (state, action: PayloadAction<number>) => {
      state.productForm.discount = action.payload;
    },

    setGabarit: (state, action: PayloadAction<Gabarit>) => {
      state.marketForm.gabarit = action.payload;
    },
    setRedemptionPercentage: (state, action: PayloadAction<number>) => {
      state.marketForm.redemptionPercentage = action.payload;
    },
  },
});

export const selectPriceForSell = (state: any) => {
  return (
    state.forms.productForm.priceBeforeDiscount *
      (1 - state.forms.productForm.discount) || 0
  );
};

export const selectComission = (state: any) => {
  const price = selectPriceForSell(state);
  return (
    (state.forms.productForm?.productAndCategory?.percents || 0) * price || 0
  );
};

export const selectDeliveryToPVZ = (state: any) => {
  const priceForSell = selectPriceForSell(state);
  return (
    priceForSell * state.forms.marketForm.gabarit?.percentageForDelivery || 0
  );
};

export const selectDeliveryWithDemesion = (state: any) => {
  const deliveryToPVZ = selectDeliveryToPVZ(state);
  const rp = state.forms.marketForm?.redemptionPercentage;
  return (rp * deliveryToPVZ + (1 - rp) * deliveryToPVZ) / rp || 0;
};

export const selectStorageSixteenDays = (state: any) => {
  return 60 * state.productForm?.productAndCategory?.warehouseStorage || 0;
};

export const {
  setProductAndCategory,
  setCostPrice,
  setPriceBeforeDiscount,
  setDiscount,
  setGabarit,
  setRedemptionPercentage,
} = formsSlice.actions;

export default formsSlice.reducer;
