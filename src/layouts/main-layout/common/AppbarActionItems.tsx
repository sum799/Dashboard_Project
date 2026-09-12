import { Stack, SxProps } from '@mui/material';
import { getStoredAuthUser } from 'lib/googleAuth';
import LanguageMenu from './LanguageMenu';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';

interface AppbarActionItemsProps {
  sx?: SxProps;
}

const AppbarActionItems = ({ sx }: AppbarActionItemsProps) => {
  const isAuthenticated = !!getStoredAuthUser();

  return (
    <Stack
      className="action-items"
      spacing={1}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      <LanguageMenu />
      <NotificationMenu disabled={!isAuthenticated} />
      <ProfileMenu disabled={!isAuthenticated} />
    </Stack>
  );
};

export default AppbarActionItems;
