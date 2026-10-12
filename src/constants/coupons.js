export const AVAILABLE_COUPONS = [
  {
    code: "FIRST50",
    description: "Flat ₹50 OFF on orders above ₹199",
    type: "flat",
    discountAmount: 50,
    minOrder: 199
  },
  {
    code: "FOOD100",
    description: "Flat ₹100 OFF on orders above ₹399",
    type: "flat",
    discountAmount: 100,
    minOrder: 399
  },
  {
    code: "WELCOME20",
    description: "20% OFF up to ₹150 on orders above ₹249",
    type: "percentage",
    percentage: 20,
    maxDiscount: 150,
    minOrder: 249
  },
  {
    code: "FEAST30",
    description: "30% OFF up to ₹200 on orders above ₹499",
    type: "percentage",
    percentage: 30,
    maxDiscount: 200,
    minOrder: 499
  }
];

export const validateCoupon = (code, subtotal) => {
  if (!code) return { valid: false, message: "Please enter a coupon code." };
  const coupon = AVAILABLE_COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  if (!coupon) {
    return { valid: false, message: "Invalid or expired coupon code." };
  }
  if (subtotal < coupon.minOrder) {
    return { 
      valid: false, 
      message: `Minimum order of ₹${coupon.minOrder} required for coupon ${coupon.code}.` 
    };
  }
  let discount = 0;
  if (coupon.type === "flat") {
    discount = coupon.discountAmount;
  } else if (coupon.type === "percentage") {
    discount = Math.min(Math.round((subtotal * coupon.percentage) / 100), coupon.maxDiscount);
  }
  return { valid: true, coupon, discount, message: `Coupon ${coupon.code} applied successfully! Saved ₹${discount}.` };
};
