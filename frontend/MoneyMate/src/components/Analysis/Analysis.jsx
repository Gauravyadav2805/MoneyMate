import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { analysis } from '../../utils/Icons'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import PieChart from '../Chart/PieChart';
import BarChart from '../Chart/BarChart';
const BASE_URL = "http://localhost:5000/api/v1/";

function Analysis() {
    const[incomeSummary,setIncomeSummary] = useState({});
    const[expenseSummary,setExpenseSummary] = useState({});
    const[incomeDistribution,setIncomeDistribution] = useState([]);
    const[expenseDistribution,setExpenseDistribution] = useState([]);
    const[error,setError] = useState(0);
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await axios.get(`${BASE_URL}get-analysis`);
                setIncomeSummary(response.data.incomeSummary);
                setExpenseSummary(response.data.expenseSummary);
                setIncomeDistribution(response.data.monthlyIncomeBreakDown.slice().reverse());
                setExpenseDistribution(response.data.monthlyExpenseBreakDown.slice().reverse());
                setError(0)
                // console.log(response.data);
            }catch(error){
                setError(1);
                console.log("Could not get The Analysis ",error)
            }
        }
        fetchData();
        
    },[]);
    useEffect(() => {
        console.log("Updated incomeSummary:", incomeSummary);
        }, [incomeSummary]);

        useEffect(() => {
        console.log("Updated expenseSummary:", expenseSummary);
        }, [expenseSummary]);

        useEffect(() => {
        console.log("Updated incomeDistribution:", incomeDistribution);
        }, [incomeDistribution]);

        useEffect(() => {
        console.log("Updated expenseDistribution:", expenseDistribution);
        }, [expenseDistribution]);
    
  return (
    <>
    
    <AnalysisStyled>
    <h1>Analysis</h1>
        <div className='graph-content'> 
            {error ? ("Could Not Display the data :("):(
                <>
                    {/* <div className='income-category-wise'> */}
                        <p>income-category-wise</p>
                        <div className='pie-chart'>
                            <PieChart data={incomeSummary} label={"Total Income"}/>
                        </div>
                    {/* </div> */}
                    {/* <div className="expense-category-wise"> */}
                        <p>expense-category-wise</p>
                        <div className='pie-chart'>
                            <PieChart data={expenseSummary} label={"Total Expense"}/>
                        </div>
                    {/* </div> */}
                </>
            )}
        </div>
    </AnalysisStyled>
    <GraphStyled>
        <div className="income-distribution">
            <p>Income-distribution</p>
            <BarChart data={incomeDistribution} label={"Income"}/>
        </div>
        <div className="expense-distribution">
            <p>Expense-distribution</p>
            <BarChart data={expenseDistribution} label={"Expense"}/>
        </div>
    </GraphStyled>
    </>
  )
}
const AnalysisStyled = styled.h1`
    display: flex;
    margin: 5%;
    flex-direction: column;
    p {
        font-size: 1.5rem;
    }
    h1 {
        text-align: center;
        font-size: 2.5rem;
    }
    .pie-chart{
        width:50%;
    }
    
`;
const GraphStyled = styled.div`
    margin: 5%;
    display: flex;
    flex-direction: column;
    p{
        font-weight: bold;
        font-size: 1.5rem;
        color: var(--primary-color);
    }
    .income-distribution{
        margin-bottom: 4rem;
    }
`
export default Analysis