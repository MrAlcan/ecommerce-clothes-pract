import { loginUser, loginWithGoogle, logout, registerUser } from './auth';
import { getProduct, getProductPerPage, getSizeProducts, newProduct } from './product'


export const server = {
  // actions

  // Auth
  registerUser,
  logout,
  loginUser,
  loginWithGoogle,
  getProduct,
  newProduct,
  getSizeProducts,
  getProductPerPage,
};