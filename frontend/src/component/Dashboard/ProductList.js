import React, { useEffect } from 'react'
import "./ProductList.css"
import "./sidebar.css"
import "./Dashboard.css"
import {DataGrid} from "@material-ui/data-grid";
import {useDispatch,useSelector} from "react-redux";
import {clearErrors,getAdminProducts,deleteProduct} from "../../actions/productAction";
import {Button, Slide} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import{NavLink, useNavigate} from "react-router-dom";
import Sidebar from "./Sidebar"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';

const ProductList = () => {
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const {error, products} = useSelector((state) => state.products);
    const {error:deleteError, isDeletetd} = useSelector((state) => state.product)

    const deleteProductHandler = (id) =>{
       dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if(error){
            alert(error);
            dispatch(getAdminProducts());
        }
        if(deleteError){
          alert(error)
          dispatch(clearErrors());
        }

        if(isDeletetd){
          alert("Item deleted successfully")
          navigate('/admin/dashboard');
          dispatch({type:DELETE_PRODUCT_RESET})
        }
    },[dispatch,error,deleteError,isDeletetd,navigate])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    
        {
          field: "name",
          headerName: "Name",
          minWidth: 350,
          flex: 1,
        },
        {
          field: "stock",
          headerName: "Stock",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "price",
          headerName: "Price",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <NavLink to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </NavLink>
    
                <Button
                  onClick={() =>
                    deleteProductHandler(params.getValue(params.id, "id"))
                  }
                >
                  <DeleteIcon />
                </Button>
              </>
            );
          },
        },
      ];

      const rows = [];

      products &&
        products.forEach((item) => {
          rows.push({
            id: item._id,
            stock: item.Stock,
            price: item.price,
            name: item.name,
          });
        });

  return (
   <>
    <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
            {products && products.map((product) => (
               <p>{product.name}</p>
            ))}
        <h2>Hwllo</h2>
      </div>
   </>
  )
}

export default ProductList
