import { Paper, Stack, Typography } from '@mui/material';
import Image from 'components/base/Image';
import bg from '/assets/images/cta-bg.svg';

const ProPlanCTA = () => {
  return (
    <Paper
      sx={{
        p: { xs: 3, md: 5 },
        height: 1,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Image
        src={bg}
        sx={{ position: 'absolute', inset: 0, height: 1, width: 1, objectFit: 'cover', zIndex: -1 }}
      />
      <Stack
        direction="column"
        gap={2}
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 220,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            typography: { xs: 'h4', sm: 'h3' },
            textAlign: 'center',
          }}
        >
          SumK9
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: 520,
          }}
        >
          Your dashboard is ready to explore with a clean, modern overview built for everyday use.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ProPlanCTA;
