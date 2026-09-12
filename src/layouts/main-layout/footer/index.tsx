import { Divider, Link, Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <>
      <Divider />
      <Stack
        component="footer"
        direction={{ xs: 'column', sm: 'row' }}
        sx={[
          {
            columnGap: 3,
            rowGap: 1,
            bgcolor: 'background.default',
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: { xs: 'center', sm: 'center' },
            py: 2,
            px: { xs: 3, md: 5 },
            textAlign: { xs: 'center', sm: 'left' },
            flexWrap: 'wrap',
          },
        ]}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          © 2026 SumK9
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
          <Link href="mailto:hello@sumk9.com" underline="hover" color="text.secondary">
            hello@sumk9.com
          </Link>
          <Link href="tel:+919876543210" underline="hover" color="text.secondary">
            +91 98765 43210
          </Link>
          <Link
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            underline="hover"
            color="text.secondary"
          >
            Twitter
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            underline="hover"
            color="text.secondary"
          >
            Instagram
          </Link>
        </Stack>
      </Stack>
    </>
  );
};

export default Footer;
