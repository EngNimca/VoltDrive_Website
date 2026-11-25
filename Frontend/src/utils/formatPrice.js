// 44990 -> "$44,990"
export const formatPrice = (n) => '$' + Number(n).toLocaleString('en-US')