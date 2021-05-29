const CategoryModel = require('../model/categoryModel');
const mongoose = require('mongoose');
var successmessage = null;
var errormessage = null;

exports.getCategoryData=(req,res,next)=>{
    res.render('categoryEntry')
}
exports.postCategoryData=(req,res,next)=>{
    console.log(req.body,'jagan')
    const CategoryName = req.body.categoryName;
    const Category = new CategoryModel(
        {
            categoryName:CategoryName,
    }
    );
    Category
        .save().then(result=>{
            console.log(result,'result')
            // req.session.Categorydetails ={
            //                 Categoryid: Category._id
            //             }
            //             console.log('Customerid',req.session.Categorydetails.Categoryid)
            successmessage = 'Success';
            console.log('user created successfully');
            res.redirect('/category/view');
        })
        .catch(err=>{
            errormessage = err;
            console.log(err);
            // res.redirect('/users/categoryView');
        })
}
exports.getCategoryView = (req,res,next)=>{
    CategoryModel.find({isDeleted:false},function(err,category){  
        res.render('categoryDataView',{
            category : category,
            successmessage : successmessage,
            errormessage:errormessage
        });
        successmessage = null;
        errormessage = null;
    }); 
}
exports.getCategoryUpdate = (req,res,next)=>{
    const Id = req.params.Id;
    CategoryModel.findById(Id).then(category=>{
        res.render('categoryDataUpdate',{
            category: category
        })
    })
}
exports.postCategoryUpdate = (req,res,next)=>{
    const Id= req.body._id;
    console.log(Id,'yyyy')
    const mCategoryName = req.body.categoryName;
    console.log(mCategoryName,'qwerttyuiiopp')
    const updatedOn = new Date();
    CategoryModel.findById(Id).then(category=>{
        console.log(category,'updatedata are')
        category.categoryName = mCategoryName;
        category.updatedOn = updatedOn;
        return category.save()
}).then(result=>{
    res.redirect('/category/view')
    console.log( "category Updated Successfully")
})
}
exports.getCategoryDelete =(req, res,next)=>{
    const Id = req.params.Id;
    console.log(Id,'hghjgjkhjkhkj')
    CategoryModel.findById(Id).then(category=>{
    category.isDeleted=true;
    category.updatedOn = new Date();
    return category.save()
    .then(result=>{
        successmessage= "category Deleted Successfully";
        res.redirect('/category/view');
    })
    .catch(err=> {
        errormessage=err;
        res.redirect('/category/view');
    });
    })


}