// File header: `PasswordTextField` is a small wrapper around MUI `TextField`
// that provides a visibility toggle for password inputs. Keep logic minimal
// and avoid storing the password in any higher-level state.
import { SyntheticEvent, useState } from 'react';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const PasswordTextField = ({ ref, ...props }: TextFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibilty = (event: SyntheticEvent) => {
    event.preventDefault();
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      type={isPasswordVisible ? 'text' : 'password'}
      ref={ref}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordVisibilty}>
                {isPasswordVisible ? (
                  <IconifyIcon icon="material-symbols-light:visibility-outline-rounded" />
                ) : (
                  <IconifyIcon icon="material-symbols-light:visibility-off-outline-rounded" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
};

export default PasswordTextField;
