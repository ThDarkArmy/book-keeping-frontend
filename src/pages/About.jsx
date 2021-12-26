import React, {useEffect} from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const About = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("isLoggedIn")) {
          navigate("/login-register");
        }
      }, []);
    return (
        <div>
            <Header/>
            <div style={{marginLeft: 260, marginTop: 100}}>
                <div style={{padding: 100}}>
                    <Typography style={{marginLeft: 30, color: 'red'}} variant='h4'>Book Keeping</Typography>
                    <ul>
                        <li>
                        <Typography>
                     Bookkeeping helps to keep track of receipts, payments. Sales, purchases and record of every other transaction made from the business.
                    </Typography>
                        </li>
                        <li>
                        <Typography>
                    It helps to summarize the income, expenditure and other ledger records periodically.
                    </Typography>
                        </li>
                        <li>
                        <Typography>
                    It provides information to create financial reports which tells us specific information about the business as how much profits the business has made or how much the business is worth at a specific point of time.
                        </Typography>
                        </li>
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default About
