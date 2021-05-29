const ProductModel = require('../model/productModel');
const mongoose = require('mongoose');
var successmessage = null;
var errormessage = null;

exports.getProductData=(req,res,next)=>{
    res.render('productEntry')
}
exports.postProductData=(req,res,next)=>{
    console.log(req.body,'jagan')
    const ProductName = req.body.productName;
    const Product = new ProductModel(
        {
            productName:ProductName,
    }
    );
    Product
        .save().then(result=>{
            console.log(result,'result')
            // req.session.Categorydetails ={
            //                 Categoryid: Category._id
            //             }
            //             console.log('Customerid',req.session.Categorydetails.Categoryid)
            successmessage = 'Success';
            console.log('product created successfully');
            res.redirect('/product/view');
        })
        .catch(err=>{
            errormessage = err;
            console.log(err);
            // res.redirect('/users/categoryView');
        })
}
exports.getProductView = (req,res,next)=>{
    ProductModel.find({isDeleted:false},function(err,product){  
        res.render('productDataView',{
            product : product,
            successmessage : successmessage,
            errormessage:errormessage
        });
        successmessage = null;
        errormessage = null;
    }); 
}
exports.getProductUpdate = (req,res,next)=>{
    const Id = req.params.Id;
    ProductModel.findById(Id).then(product=>{
        res.render('productDataUpdate',{
            product: product
        })
    })
}
exports.postProductUpdate = (req,res,next)=>{
    const Id= req.body._id;
    console.log(Id,'yyyy')
    const mProductName = req.body.productName;
    console.log(mProductName,'qwerttyuiiopp')
    const updatedOn = new Date();
    ProductModel.findById(Id).then(product=>{
        console.log(product,'updatedata are')
        product.productName = mProductName;
        product.updatedOn = updatedOn;
        return product.save()
}).then(result=>{
    res.redirect('/product/view')
    console.log( "product Updated Successfully")
})
}
exports.getProductDelete =(req, res,next)=>{
    const Id = req.params.Id;
    console.log(Id,'hghjgjkhjkhkj')
    ProductModel.findById(Id).then(product=>{
        product.isDeleted=true;
        product.updatedOn = new Date();
    return product.save()
    .then(result=>{
        successmessage= "product Deleted Successfully";
        res.redirect('/product/view');
    })
    .catch(err=> {
        errormessage=err;
        res.redirect('/product/view');
    });
    })


}