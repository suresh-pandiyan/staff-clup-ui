import { Grid, Card, CardContent, CardActions, Typography, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const EmergencyPaymentForm = () => {
    return (
        <div>
            <h1>Emergency Payment Form</h1>
            <form>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }} sx={{marginBottom: "20px"}}>
                    <Grid item xs={12}>
                            <FormControl fullWidth sx={{width: "300px"}}>
                                <InputLabel id="demo-simple-select-label">Months</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                  //  value={age}
                                    label="Age"
                                 //   onChange={handleChange}
                                >
                                    <MenuItem value={"January"}>January</MenuItem>
                                    <MenuItem value={"February"}>February</MenuItem>
                                    <MenuItem value={"March"}>March</MenuItem>
                                    <MenuItem value={"April"}>April</MenuItem>
                                    <MenuItem value={"May"}>May</MenuItem>
                                    <MenuItem value={"June"}>June</MenuItem>
                                    <MenuItem value={"July"}>July</MenuItem>
                                    <MenuItem value={"August"}>August</MenuItem>
                                    <MenuItem value={"September"}>September</MenuItem>
                                    <MenuItem value={"October"}>October</MenuItem>
                                    <MenuItem value={"November"}>November</MenuItem>
                                    <MenuItem value={"December"}>December</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Amount" variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="secondary" sx={{ padding: "17px 20px" }}>Pay 500 now</Button>
                        </Grid>
                    </Grid>
            </form>
        </div>
    );
};

export default EmergencyPaymentForm;

