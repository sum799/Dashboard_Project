import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { setStoredAuthUser } from 'lib/googleAuth';
import PasswordTextField from 'components/common/PasswordTextField';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    const webAppUrl =
      'https://script.google.com/macros/s/AKfycbyEMJFP5fb8NRzH6Br9tUX209YagheTUNa8S24cYAAF034L9E6H8pV1xo1IceTqTfg8/exec';

    try {
      const response = await fetch(webAppUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({
          User_ID: userId,
          Password: password,
        }),
      });

      const data = await response.json();
      console.log('Authentication response received:', data);

      const isUserValid =
        data?.User_Found === true ||
        data?.User_Found === 'true' ||
        data?.User_id === true ||
        data?.User_id === 'true' ||
        data?.User_ID === true ||
        data?.User_ID === 'true';

      if (isUserValid) {
        setStoredAuthUser({
          email: userId,
          name: userId,
          googleUserId: userId,
        });
        navigate('/');
      } else {
        setPassword('');
        setErrorMessage('Invalid User ID or Password credentials. Please try again.');
      }
    } catch (error) {
      console.error('Critical API communication error:', error);
      setErrorMessage('Network error: Unable to reach verification server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      direction="column"
      sx={{
        height: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        pt: { md: 10 },
        pb: 10,
      }}
    >
      <div />

      <Grid
        container
        sx={{
          maxWidth: '35rem',
          rowGap: 4,
          p: { xs: 3, sm: 5 },
          mb: 5,
        }}
      >
        <Grid size={12}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            sx={{
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'flex-end' },
            }}
          >
            <Typography variant="h4">Log in</Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <Box component="form" noValidate onSubmit={handleLoginSubmit}>
            <Grid container>
              <Grid
                sx={{
                  mb: 3,
                }}
                size={12}
              >
                <TextField
                  fullWidth
                  size="large"
                  id="userId"
                  type="text"
                  label="User ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </Grid>

              <Grid
                sx={{
                  mb: 2.5,
                }}
                size={12}
              >
                <PasswordTextField
                  fullWidth
                  size="large"
                  id="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </Grid>

              {errorMessage && (
                <Grid size={12} sx={{ mb: 2 }}>
                  <Alert severity="error" variant="filled">
                    {errorMessage}
                  </Alert>
                </Grid>
              )}

              <Grid
                sx={{
                  mb: 6,
                }}
                size={12}
              >
                <Stack
                  spacing={1}
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox name="checked" color="primary" size="small" />}
                    label={
                      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                        Remember this device
                      </Typography>
                    }
                  />

                  <Link href="#!" variant="subtitle2">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>

              <Grid size={12}>
                <Button
                  fullWidth
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={isLoading || !userId || !password}
                >
                  {isLoading ? 'Verifying Credentials...' : 'Login'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Link href="#!" variant="subtitle2">
        Trouble signing in?
      </Link>
    </Stack>
  );
};

export default LoginForm;
