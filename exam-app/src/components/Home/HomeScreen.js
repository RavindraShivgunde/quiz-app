import { Button, TableHead, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import "./HomeScreen.css"

function HomeScreen() {
    return (
        <div>
            <div className="app__header">
                <h1 className="header__title">Softflame</h1>
            </div>

            <div className="app__body">
                <div className="table">
                    <Table>
                        <TableHead>

                            <TableRow >
                                <TableCell className="table__column"><div className="table__content"><h4>Test Name</h4></div></TableCell>
                                <TableCell className="table__column"><div className="table__content"><h4>Total Questions</h4></div></TableCell>
                                <TableCell className="table__column"><div className="table__content"><h4>Total Time</h4></div></TableCell>
                                <TableCell className="table__column"><div className="table__content"><h4>Maximum Marks</h4></div></TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell className="table__column"><div className="table__content">Electronics</div></TableCell>
                                <TableCell className="table__column"><div className="table__content">10</div></TableCell>
                                <TableCell className="table__column"><div className="table__content">30 min</div></TableCell>
                                <TableCell className="table__column"><div className="table__content">40</div></TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <div className="instructions">
                    <h3>General Instructions:</h3>
                    <div className="instruction__set">
                        <p>1. Total Marks = 60 marks</p>
                        <p>2. For each correct answer, positive marks = 4 marks</p>
                        <p>3. For each wrong answer, 1 mark will be deduced from the gained marks </p>
                        <p>4. Total time for the test is 15 mins. Test will get automatically submitted exactly after 15 minutes from the time you start the test.</p>
                    </div>

                    <form className="agreement">
                        <input type="checkbox" />
                        <label> I have read and understood the above instructions.I agree that in case of not following the given instructions, I might get disqualified from giving the exam.</label>
                        <br />
                        <Button variant="outlined">START TEST</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen
