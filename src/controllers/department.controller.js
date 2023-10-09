"use strict"
const { model } = require('mongoose')
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require('../models/department.model')


module.exports={

    list: async(req,res)=>{
        const data = await res.getModelList(Department)

        res.status(200).send({
            error:false,
            data // cosnt data:data yerine sadece data yazılıp gönderilebilir
        })
    },
    create:async()=>{
        const data = await res.create(req.body)

        res.status(201).send({
            error:false,
            data // cosnt data:data yerine sadece data yazılıp gönderilebilir
        })
    },
    read:async()=>{
        const data = await Department.findOne({_id:req.params.id})

        res.status(200).send({
            error:false,
            data // cosnt data:data yerine sadece data yazılıp gönderilebilir
        })
    },
    update:async()=>{
        //update işleminde ilk parametre filteleme ikinci parametre güncellenecek değer
        const data = await Department.updateOne({_id:req.params.id},req.body)

        res.status(202).send({
            error:false,
            data, // cosnt data:data yerine sadece data yazılıp gönderilebilir
            // update işlemi olduktan sonra güncelenmiş datanın son halinide new valuesunda çalıştırdığımız değer ile görebiiriz.
            new: await Department.findOne({_id:req.params.id})
        })
        
    },
    delete:async()=>{
        //update işleminde ilk parametre filteleme ikinci parametre güncellenecek değer
        const data = await Department.deleteOne({_id:req.params.id})

        const statusCode = data.deletedCount>=1 ? true:false

        //? delete işlemi sonrası deletedCount bilgisi 0 veya 1 olarak geliyor buradaki bilgiye göre status code ve eror bilgisi belirlenir

        res.status(statusCode ? 204:404).send({
            error:statusCode,
            data,
            new: await Department.findOne({_id:req.params.id})
        })
    }
}


