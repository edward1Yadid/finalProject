import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function OptionListComponent() {
    
const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
  ];
  return (
    
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', minWidth: 120,alignItems:"self-start"}}>
      <FormControl fullWidth>
        <InputLabel variant="filled" htmlFor="gender-select" >
          Gender
        </InputLabel>
        <NativeSelect
          defaultValue=""
          inputProps={{
            name: 'gender',
            id: 'gender'
          }}
          required
   
        >
          <option value="" disabled></option>
          {genderOptions?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
