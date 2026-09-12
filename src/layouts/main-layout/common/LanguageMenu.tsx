import { Button } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';

const LanguageMenu = () => {
  return (
    <Button color="neutral" variant="text" shape="circle" aria-label="India locale">
      <IconifyIcon icon="twemoji:flag-india" sx={{ fontSize: 24 }} />
    </Button>
  );
};

export default LanguageMenu;
