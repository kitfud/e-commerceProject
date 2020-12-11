import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product'
import useStyles from './styles'

const products = [
    { id:1, name:'Colonized Agar Plate [Shitake Mushroom]', description:'fully colonized agar plate', price: '$8',image:'https://lh3.googleusercontent.com/pw/ACtC-3eLa5kp3B5__Hq7tK8ZLbo_QU7zfqFe6BvIjZXZEvHIMfg0qssKITjVZYNzcktfaJNsaqKHA9eqwBd_GSpycM6WMy4tJZa-bMaLtpv9m6v0AIRTeofB3fkUdOfV1cHyO-RC_D5hoQ-dhOCKu8tbMYsS=w508-h640-no?authuser=0'},
    { id:1, name:'Colonized Agar Plate [Golden Oyster]', description:'fully colonized agar plate', price:'$8',image:'https://lh3.googleusercontent.com/pw/ACtC-3eMMKfremA4u4PHAbrFBJ1JyXj8ZfRErXderzsTeTo5FoRzk-Mjwv_dEqu-XpYG9GVsvy_trmfgtz0ZASO2o6J6LJJMWKgRz1kMp0sEF6KdlPtZNdQfLBwZ0gkxYNgnTlu17OGVpndqYIwh_ZbZ9aIl=w480-h640-no?authuser=0'},
];


const Products = () => {
    const classes = useStyles();

    return (
<main className = {classes.content}>
    <div className = {classes.content}/>
    <div className = {classes.toolbar}/>
    <Grid container justify = "center" spacing ={4}>
    {products.map((product)=>
        <Grid item key ={product.id} xs = {12} sm={6} md={4} lg={3}>
            <Product product = {product} />
            </Grid>
    )}
    </Grid>
</main>

    )

}

export default Products;