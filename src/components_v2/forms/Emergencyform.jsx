import * as React from "react";
import { Box, FormControl, Grid, Typography, Button, TextField, FormHelperText, NativeSelect, Autocomplete } from "@mui/material";
import * as yup from 'yup';
import { commonTextFieldStyles, commonFormLabelStyles, commonSubmitStyle, commonCancelStyles } from "../styles/commonStyles";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emergencyfundSchema } from "../validiations/FormValidiations";
import { useFinancialYears, useUsers } from "../../hooks";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const EmergencyForm = ({ onSubmit, onCancel, loading = false, defaultValues = {}, isEdit = false }) => {
    const [employeeId, setEmployeeId] = React.useState(null);

    const { data: financialYears, } = useFinancialYears();
    const activeFinancialYear = financialYears?.data?.find(year => year.currentlyActive);
    const defaultfinanceYearId = activeFinancialYear ? (activeFinancialYear.id || activeFinancialYear._id) : '';
    const { data: users, refetch, isLoading: usersLoading, error: usersError } = useUsers();

    const {
        control,
        watch,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(emergencyfundSchema),
        defaultValues: {
            financeYearId: defaultfinanceYearId,
            employeeId: defaultValues.employeeId || '',
            nomineeId: defaultValues.nomineeId || '',
            emergencyFundAmount: defaultValues.emergencyFundAmount || '',
            ...defaultValues,
        },
    });

    const onSubmitForm = (data) => {
        console.log('Emergency Form submitted with data:', data);
        onSubmit(data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ marginTop: '30px' }}>
                        <FormControl fullWidth error={!!errors.employeeId}>
                            <Typography component="label" sx={commonFormLabelStyles} className="text-black">
                                Employee Id *
                            </Typography>
                            <Controller
                                name="employeeId"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Autocomplete
                                            key={users?.data?.length || 0}
                                            options={users?.data || []}
                                            loading={usersLoading}
                                            getOptionLabel={(option) => option?.employeeId || ""}
                                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                            onChange={(event, value) => field.onChange(value?.id || '')}
                                            value={users?.data?.find(option => option.id === field.value) || null}
                                            ListboxProps={{
                                                style: {
                                                    maxHeight: '300px', // Adjust this value as needed
                                                }
                                            }}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        label="Enter Employee Id"
                                                        variant="filled"
                                                        error={!!errors.employeeId}
                                                        sx={commonTextFieldStyles}
                                                    />
                                                );
                                            }}
                                        />
                                    );
                                }}
                            />
                            {errors.employeeId && <FormHelperText error>{errors.employeeId.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }} sx={{ marginTop: '30px' }}>
                        <FormControl fullWidth error={!!errors.nomineeId}>
                            <Typography component="label" sx={commonFormLabelStyles} className="text-black">
                                Nominee Id *
                            </Typography>
                            <Controller
                                name="nomineeId"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Autocomplete
                                            key={users?.data?.length || 0}
                                            options={users?.data || []}
                                            loading={usersLoading}
                                            getOptionLabel={(option) => option?.employeeId || ""}
                                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                                            onChange={(event, value) => field.onChange(value?.id || '')}
                                            value={users?.data?.find(option => option.id === field.value) || null}
                                            ListboxProps={{
                                                style: {
                                                    maxHeight: '300px', // Adjust this value as needed
                                                }
                                            }}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        label="Enter Nominee Id"
                                                        variant="filled"
                                                        error={!!errors.nomineeId}
                                                        sx={commonTextFieldStyles}
                                                    />
                                                );
                                            }}
                                        />
                                    );
                                }}
                            />
                            {errors.nomineeId && <FormHelperText error>{errors.nomineeId.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }} >
                        <FormControl fullWidth error={!!errors.emergencyFundAmount}>
                            <Typography component="label" sx={commonFormLabelStyles} className="text-black">
                                Emergency Amount *
                            </Typography>
                            <Controller
                                name="emergencyFundAmount"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Enter Emergency Amount"
                                        type='number'
                                        InputProps={{
                                            inputProps: {
                                                min: 1,
                                            },
                                        }}
                                        variant="filled"
                                        error={!!errors.emergencyFundAmount}
                                        sx={commonTextFieldStyles}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                )}
                            />
                            {errors.emergencyFundAmount && <FormHelperText error>{errors.emergencyFundAmount.message}</FormHelperText>}
                        </FormControl>
                    </Grid>

                    {/* Submit Buttons */}
                    <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                variant="outlined"
                                onClick={onCancel}
                                disabled={loading || isSubmitting}
                                sx={commonCancelStyles}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={loading || isSubmitting}
                                sx={commonSubmitStyle}
                            >
                                {loading || isSubmitting ? 'Creating...' : 'Create Emergency Fund'}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default EmergencyForm;