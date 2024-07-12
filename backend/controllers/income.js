const IncomeSchema = require("../models/IncomeModel")
exports.addIncome = async (req,res)=>{
    const{title, amount, category, description, date} = req.body;
    const income = IncomeSchema({
        title,
        amount,
        date,
        category,
        description
    })
    try{
        //validations
        if(!title || !amount  || !category || !description){
            return res.status(400).json({message:'All fields required'})
        }
        if(amount <=0 || !amount ==='number'){
            return res.status(400).json({message:'Amount must be positive number'})
        }
        await income.save
        res.status(200).json({message:'Income Added'})
    }
    catch(error){
        console.log(error)
        res.status(401).json({message:'Could not add data'})
    }
    console.log(req.body);
}