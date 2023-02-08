import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";


function FormSelect({ name, label, children, ...other }) {
    const { control } = useFormContext();


  return (
    <Controller
       name={name}
       control={control}
    render={({ field, fieldState: { error }}) => (
        <TextField
            label={label}
            variant="filled"
            color="secondary"
            size="small"
            select
            fullWidth
            SelectProps={{ native: true }}
            error={!!error}
            helperText={error?.message}
            {...other}
            {...field}
        >
            {children}
        </TextField>
    )}
    />
  );
}

export default FormSelect;