const ExpenseSchema = require("../models/ExpenseModel")
const IncomeSchema = require("../models/IncomeModel")
exports.getanalysis = async(req,res)=>{
    try{
        const incomes = await IncomeSchema.find();
        const expenses = await ExpenseSchema.find();
        const data = [];
        if(!incomes.length && !expenses.length){
            res.status(401).json({message:'Insuffcient Data to show Analysis'},data=data);
        }
        const totalIncome = incomes.reduce((a,b)=> a+b.amount,0);
        const totalExpense = expenses.reduce((a,b)=>a+b.amount,0);
        const averageIncome = totalIncome/(incomes.length);
        const averageExpense = totalExpense/(expenses.length);

        const incomeSummary = incomes.reduce((acc,curr)=>{
            if(!acc[curr.category]){
                acc[curr.category] = 0;
            }
            acc[curr.category] += curr.amount;
            return acc;
        },{});

        const expenseSummary = expenses.reduce((acc,curr)=>{
            if(!acc[curr.category]){
                acc[curr.category] = 0;
            }
            acc[curr.category] += curr.amount;
            return acc;
        },{});

        //getting the monthly breakdown 
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        //Initialize arrays to hold the monthly breakdown for the past year
        const monthlyIncomeBreakDown = Array.from({length:12},(_,i)=>{
            const date = new Date(currentYear,currentMonth-i,1);
            return {
                month: date.toLocaleString('default',{month:'long',year:'numeric'}),
                amount: 0
            };
        });

        const monthlyExpenseBreakDown = Array.from({length:12},(_,i)=>{
            const date = new Date(currentYear,currentMonth-i,1);
            return {
                month: date.toLocaleString('default',{month:'long',year:'numeric'}),
                amount: 0,
            };
        });


        //adding the data monthly wise
        incomes.forEach(t=>{
            const transactionDate = new Date(t.date);
            const monthDiff = currentMonth - transactionDate.getMonth() + (currentYear -transactionDate.getFullYear())*12;
            if(monthDiff>=0 && monthDiff<=12){
                monthlyIncomeBreakDown[monthDiff].amount += t.amount;
            }
        });

        expenses.forEach(t=>{
            const transactionDate = new Date(t.date);
            const monthDiff = currentMonth - transactionDate.getMonth() + (currentYear -transactionDate.getFullYear())*12;
            if(monthDiff>=0 && monthDiff<=12){
                monthlyExpenseBreakDown[monthDiff].amount += t.amount;
            }
        });
        console.log("IncomeSummary", incomeSummary)
        console.log("ExpenseSummary", expenseSummary)
        console.log("monthlyIncomeBreakdown", monthlyIncomeBreakDown)
        console.log("monthlyExpenseBreakdown", monthlyExpenseBreakDown)
        res.status(200).json({incomeSummary,expenseSummary,
            monthlyExpenseBreakDown,monthlyIncomeBreakDown});
    }catch(error){
        console.log(error)
        res.status(401).json({message:'Could not perform analysis'})
    }
}